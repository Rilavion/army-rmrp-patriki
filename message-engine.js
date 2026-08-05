window.VSRF_MSG=(function(){

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

  async function fetchChannels(){
    if(window.VSRF_DS_CACHE){
      return await window.VSRF_DS_CACHE.fetchCached("channels",async()=>{
        const c=await client();if(!c) return [];
        const {data,error}=await c.from("ds_channels").select("*").order("parent_name",{ascending:true,nullsFirst:true}).order("position",{ascending:true});
        if(error){console.warn("[MSG channels]",error.message);return []}
        return data||[];
      });
    }
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("ds_channels").select("*").order("parent_name",{ascending:true,nullsFirst:true}).order("position",{ascending:true});
    if(error){console.warn("[MSG channels]",error.message);return []}
    return data||[];
  }

  async function fetchRoles(){
    if(window.VSRF_DS_CACHE){
      return await window.VSRF_DS_CACHE.fetchCached("roles",async()=>{
        const c=await client();if(!c) return [];
        const {data,error}=await c.from("ds_roles").select("*").order("position",{ascending:false});
        if(error){console.warn("[MSG roles]",error.message);return []}
        return data||[];
      });
    }
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("ds_roles").select("*").order("position",{ascending:false});
    if(error){console.warn("[MSG roles]",error.message);return []}
    return data||[];
  }

  async function fetchMembers(){
    if(window.VSRF_DS_CACHE){
      return await window.VSRF_DS_CACHE.fetchCached("members_light",async()=>{
        const c=await client();if(!c) return [];
        const {data,error}=await c.from("ds_members").select("discord_id,display_name,username,parsed_fio,parsed_dept").eq("active",true).order("parsed_fio",{ascending:true});
        if(error){console.warn("[MSG members]",error.message);return []}
        return data||[];
      });
    }
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("ds_members").select("discord_id,display_name,username,parsed_fio,parsed_dept").eq("active",true).order("parsed_fio",{ascending:true});
    if(error){console.warn("[MSG members]",error.message);return []}
    return data||[];
  }

  async function fetchHistory(limit){
    const c=await client();if(!c) return [];
    const {data,error}=await c.from("bot_messages").select("*").order("requested_at",{ascending:false}).limit(limit||30);
    if(error){console.warn("[MSG history]",error.message);return []}
    return data||[];
  }

  async function sendMessage(payload){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const s=window.VSRF_AUTH&&window.VSRF_AUTH.state;
    const name=(function(){try{return localStorage.getItem("vsrf-my-display-name")||(s&&s.user&&s.user.email)||"admin"}catch(e){return "admin"}})();
    const row={
      channel_id:payload.channel_id,
      content:payload.content||null,
      embed_title:payload.embed_title||null,
      embed_description:payload.embed_description||null,
      embed_color:payload.embed_color==null?null:payload.embed_color,
      embed_image_url:payload.embed_image_url||null,
      embed_footer:payload.embed_footer||null,
      ping_type:payload.ping_type||"none",
      ping_value:payload.ping_value||null,
      attachments:payload.attachments||[],
      requested_by:s&&s.user?s.user.id:null,
      requested_by_name:name
    };
    const {data,error}=await c.from("bot_messages").insert(row).select().single();
    if(error) return {ok:false,error:error.message};
    return {ok:true,id:data.id};
  }

  async function pollStatus(id,timeoutMs){
    const c=await client();if(!c) return {ok:false,error:"no client"};
    const deadline=Date.now()+(timeoutMs||30000);
    while(Date.now()<deadline){
      const {data}=await c.from("bot_messages").select("*").eq("id",id).maybeSingle();
      if(data&&(data.status==="sent"||data.status==="error")) return {ok:data.status==="sent",status:data.status,error:data.error_message,sent_message_id:data.sent_message_id,sent_channel_id:data.sent_channel_id};
      await new Promise(r=>setTimeout(r,900));
    }
    return {ok:false,error:"timeout"};
  }

  return {fetchChannels,fetchRoles,fetchMembers,fetchHistory,sendMessage,pollStatus};
})();
