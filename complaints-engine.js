window.VSRF_COMPLAINTS=(function(){
  function client(){return window.VSRF_AUTH&&window.VSRF_AUTH.state&&window.VSRF_AUTH.state.client}

  async function getForm(){
    const c=client();if(!c) return null;
    try{
      const {data,error}=await c.rpc("get_complaint_form");
      if(error){console.warn("[COMPLAINTS] getForm rpc:",error.message);return null}
      return data;
    }catch(e){return null}
  }

  async function saveForm(row){
    const c=client();if(!c) return {ok:false,error:"no client"};
    row.id=1;row.updated_at=new Date().toISOString();
    const s=window.VSRF_AUTH.state;
    if(s.user) row.updated_by=s.user.id;
    const {error}=await c.from("complaint_form").upsert(row);
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  async function submit(values,submitter,target,evidenceUrl){
    const c=client();if(!c) return {ok:false,error:"no client"};
    try{
      const {data,error}=await c.rpc("submit_complaint",{
        p_values:values||{},
        p_submitter_fio:submitter.fio||null,
        p_submitter_static:submitter.static||null,
        p_submitter_discord:submitter.discord||null,
        p_target_fio:target.fio||null,
        p_target_static:target.static||null,
        p_target_discord_id:target.discord_id||null,
        p_evidence_url:evidenceUrl||null
      });
      if(error) return {ok:false,error:error.message};
      const row=Array.isArray(data)?data[0]:data;
      return {ok:true,id:row.id,code:row.code};
    }catch(e){return {ok:false,error:e.message}}
  }

  async function fetchAll(filter){
    const c=client();if(!c) return [];
    let q=c.from("complaints").select("*").order("created_at",{ascending:false});
    if(filter&&filter.status) q=q.eq("status",filter.status);
    if(filter&&filter.target_static) q=q.eq("target_static",filter.target_static);
    const {data,error}=await q;
    if(error){console.warn("[COMPLAINTS] fetchAll:",error.message);return []}
    return data||[];
  }

  async function fetchOne(id){
    const c=client();if(!c) return null;
    const {data,error}=await c.from("complaints").select("*").eq("id",id).maybeSingle();
    if(error) return null;
    return data;
  }

  async function decide(id,verdict,comment,verdictByName){
    const c=client();if(!c) return {ok:false,error:"no client"};
    const s=window.VSRF_AUTH.state;
    if(!s||!s.user) return {ok:false,error:"Требуется вход"};
    const row={
      status:"decided",
      verdict,
      verdict_comment:comment||null,
      verdict_by_uid:s.user.id,
      verdict_by_name:verdictByName||s.user.email,
      verdict_at:new Date().toISOString()
    };
    const {data,error}=await c.from("complaints").update(row).eq("id",id).select().single();
    if(error) return {ok:false,error:error.message};
    return {ok:true,row:data};
  }

  async function remove(id){
    const c=client();if(!c) return {ok:false,error:"no client"};
    const {error}=await c.from("complaints").delete().eq("id",id);
    if(error) return {ok:false,error:error.message};
    return {ok:true};
  }

  return {getForm,saveForm,submit,fetchAll,fetchOne,decide,remove};
})();
