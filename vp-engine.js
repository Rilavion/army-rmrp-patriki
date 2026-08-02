window.VSRF_VP=(function(){

  function waitReady(){return new Promise(resolve=>{
    const deadline=Date.now()+5000;
    function ck(){const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;if(s&&s.ready){resolve(s);return true}return false}
    if(ck()) return;
    const t=setInterval(()=>{if(ck()){clearInterval(t)}else if(Date.now()>deadline){clearInterval(t);resolve(null)}},80);
  })}

  async function client(){
    await waitReady();
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    return s&&s.client?s.client:null;
  }

  async function fetchMembers(){
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("ds_members").select("*").eq("active",true).order("parsed_fio",{ascending:true});
    if(error){console.warn("[VP fetchMembers]",error.message);return []}
    return data||[];
  }

  async function fetchRoles(){
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("ds_roles").select("*").order("position",{ascending:false});
    if(error){console.warn("[VP fetchRoles]",error.message);return []}
    return data||[];
  }

  async function fetchMapping(){
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("vp_role_mapping").select("*");
    if(error){console.warn("[VP fetchMapping]",error.message);return []}
    return data||[];
  }

  async function saveMappingBatch(rows,toRemoveIds){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    if(toRemoveIds&&toRemoveIds.length){
      const {error}=await c.from("vp_role_mapping").delete().in("role_id",toRemoveIds);
      if(error) return {ok:false,error:error.message};
    }
    if(rows&&rows.length){
      const {error}=await c.from("vp_role_mapping").upsert(rows,{onConflict:"role_id"});
      if(error) return {ok:false,error:error.message};
    }
    return {ok:true};
  }

  async function fetchChecks(){
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("vp_checks").select("*");
    if(error){console.warn("[VP fetchChecks]",error.message);return []}
    return data||[];
  }

  async function saveCheck(discordId,patch,checkerName){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    const name=(checkerName&&String(checkerName).trim())||null;
    if(!name) return {ok:false,error:"empty_checker"};
    const row={
      discord_id:discordId,
      ...patch,
      checked_by:s&&s.user?s.user.id:null,
      checked_by_name:name,
      checked_at:new Date().toISOString(),
      updated_at:new Date().toISOString()
    };
    const {error}=await c.from("vp_checks").upsert(row,{onConflict:"discord_id"});
    if(error) return {ok:false,error:error.message};
    return {ok:true,checker:name};
  }

  async function resetCheck(discordId){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const {error}=await c.from("vp_checks").delete().eq("discord_id",discordId);
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  async function resetChecksBulk(discordIds){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    if(!discordIds||!discordIds.length) return {ok:true,count:0};
    const {error}=await c.from("vp_checks").delete().in("discord_id",discordIds);
    if(error) return {ok:false,error:error.message};
    return {ok:true,count:discordIds.length};
  }

  async function requestSync(){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    const name=(function(){try{return localStorage.getItem("vsrf-my-display-name")||(s&&s.user&&s.user.email)||"admin"}catch(e){return "admin"}})();
    const {data,error}=await c.from("ds_sync_requests").insert({requested_by:s&&s.user?s.user.id:null,requested_by_name:name}).select().single();
    if(error) return {ok:false,error:error.message};
    return {ok:true,id:data.id};
  }

  async function pollSyncStatus(id,timeoutMs){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const deadline=Date.now()+(timeoutMs||90000);
    while(Date.now()<deadline){
      const {data}=await c.from("ds_sync_requests").select("*").eq("id",id).maybeSingle();
      if(data&&(data.status==="done"||data.status==="error")) return {ok:data.status==="done",status:data.status,message:data.message,members_scanned:data.members_scanned};
      await new Promise(r=>setTimeout(r,1500));
    }
    return {ok:false,error:"timeout"};
  }

  async function fetchBotStatus(){
    const c=await client();if(!c) return null;
    const {data}=await c.from("bot_status").select("*").eq("id",1).maybeSingle();
    return data||null;
  }

  function filterMembers(members,mapping){
    const excludeIds=new Set(mapping.filter(m=>m.show==="exclude").map(m=>m.role_id));
    const includeIds=new Set(mapping.filter(m=>m.show==="include").map(m=>m.role_id));
    const useInclude=includeIds.size>0;
    const out=[];
    for(const m of members){
      const ids=m.role_ids||[];
      let excluded=false;
      for(const id of ids){if(excludeIds.has(id)){excluded=true;break}}
      if(excluded) continue;
      if(useInclude){
        let ok=false;
        for(const id of ids){if(includeIds.has(id)){ok=true;break}}
        if(!ok) continue;
      }
      out.push(m);
    }
    return out;
  }

  function groupByDept(members,mapping,opts){
    const hideNoDept=!!(opts&&opts.hideNoDept);
    const filtered=filterMembers(members,mapping);
    const deptRoleIds=new Set(mapping.filter(m=>m.role_kind==="department").map(m=>m.role_id));
    const labels={};
    for(const m of mapping){if(m.label) labels[m.role_id]=m.label}
    const groups=new Map();
    for(const mem of filtered){
      let deptName=null;
      const ids=mem.role_ids||[];
      for(const id of ids){
        if(deptRoleIds.has(id)){ deptName=labels[id]||id; break; }
      }
      if(!deptName){
        if(mem.parsed_dept) deptName=mem.parsed_dept;
        else if(hideNoDept) continue;
        else deptName="Без отдела";
      }
      if(!groups.has(deptName)) groups.set(deptName,[]);
      groups.get(deptName).push(mem);
    }
    return Array.from(groups.entries()).map(([name,list])=>({name,list})).sort((a,b)=>{
      if(a.name==="Без отдела") return 1;
      if(b.name==="Без отдела") return -1;
      return a.name.localeCompare(b.name,"ru");
    });
  }

  function positionFor(member,mapping){
    const posRoleIds=new Set(mapping.filter(m=>m.role_kind==="position").map(m=>m.role_id));
    const labels={};
    for(const m of mapping){if(m.label) labels[m.role_id]=m.label}
    const ids=member.role_ids||[];
    const names=member.role_names||[];
    for(let i=0;i<ids.length;i++){
      if(posRoleIds.has(ids[i])) return labels[ids[i]]||names[i]||ids[i];
    }
    return "—";
  }

  function staticFor(member){
    return (member.parsed_static||"").trim()||"—";
  }

  return {fetchMembers,fetchRoles,fetchMapping,saveMappingBatch,fetchChecks,saveCheck,resetCheck,resetChecksBulk,requestSync,pollSyncStatus,fetchBotStatus,filterMembers,groupByDept,positionFor,staticFor};
})();
