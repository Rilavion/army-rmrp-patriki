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
    const {data,error}=await c.from("ds_members").select("*").eq("active",true).order("parsed_dept",{ascending:true}).order("parsed_fio",{ascending:true});
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
    const {data,error}=await c.from("vp_role_mapping").select("*").order("sort",{ascending:true});
    if(error){console.warn("[VP fetchMapping]",error.message);return []}
    return data||[];
  }

  async function saveMapping(rows){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const clean=rows.filter(r=>r&&r.role_id&&r.kind);
    if(!clean.length) return {ok:true};
    const {error}=await c.from("vp_role_mapping").upsert(clean,{onConflict:"role_id"});
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  async function removeMapping(roleId){
    const c=await client();if(!c) return {ok:false};
    const {error}=await c.from("vp_role_mapping").delete().eq("role_id",roleId);
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  async function fetchChecks(){
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("vp_checks").select("*");
    if(error){console.warn("[VP fetchChecks]",error.message);return []}
    return data||[];
  }

  async function saveCheck(discordId,patch,checkerOverride){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    const autoName=(function(){
      try{return localStorage.getItem("vsrf-my-display-name")||(s&&s.user&&s.user.email)||"vp"}catch(e){return "vp"}
    })();
    const displayName=(checkerOverride&&String(checkerOverride).trim())||autoName;
    const row={
      discord_id:discordId,
      ...patch,
      checked_by:s&&s.user?s.user.id:null,
      checked_by_name:displayName,
      checked_at:new Date().toISOString(),
      updated_at:new Date().toISOString()
    };
    const {error}=await c.from("vp_checks").upsert(row,{onConflict:"discord_id"});
    if(error) return {ok:false,error:error.message};
    return {ok:true,checker:displayName};
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
    const name=(function(){
      try{return localStorage.getItem("vsrf-my-display-name")||(s&&s.user&&s.user.email)||"admin"}catch(e){return "admin"}
    })();
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

  function filterMembers(members,mapping){
    const excludeIds=new Set(mapping.filter(m=>m.kind==="exclude").map(m=>m.role_id));
    const includeIds=new Set(mapping.filter(m=>m.kind==="include").map(m=>m.role_id));
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

  function groupByDept(members,mapping){
    const filtered=filterMembers(members,mapping);
    const deptRoleIds=new Set(mapping.filter(m=>m.kind==="department").map(m=>m.role_id));
    const roleLabels={};
    for(const m of mapping){if(m.label) roleLabels[m.role_id]=m.label}
    const groups=new Map();
    function getGroup(name){
      if(!groups.has(name)) groups.set(name,[]);
      return groups.get(name);
    }
    for(const mem of filtered){
      let deptName=null;
      const ids=mem.role_ids||[];
      for(const id of ids){
        if(deptRoleIds.has(id)){
          deptName=roleLabels[id]||id;
          break;
        }
      }
      if(!deptName) deptName=mem.parsed_dept||"Без отдела";
      getGroup(deptName).push(mem);
    }
    return Array.from(groups.entries()).map(([name,list])=>({name,list})).sort((a,b)=>a.name.localeCompare(b.name,"ru"));
  }

  function positionFor(member,mapping){
    const posRoleIds=new Set(mapping.filter(m=>m.kind==="position").map(m=>m.role_id));
    const labels={};
    for(const m of mapping){if(m.label) labels[m.role_id]=m.label}
    const ids=member.role_ids||[];
    const names=member.role_names||[];
    for(let i=0;i<ids.length;i++){
      if(posRoleIds.has(ids[i])) return labels[ids[i]]||names[i]||ids[i];
    }
    return member.parsed_static||"—";
  }

  return {fetchMembers,fetchRoles,fetchMapping,saveMapping,removeMapping,fetchChecks,saveCheck,resetCheck,resetChecksBulk,requestSync,pollSyncStatus,groupByDept,positionFor,filterMembers};
})();
