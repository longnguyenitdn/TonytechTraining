const myFetch = async (link:string, option:string, obj?:{}) => {
   let urlFetch = "http://localhost:3001";
   urlFetch += link;
   const res = await fetch(urlFetch, {
     method: option,
     headers: {
       "Content-Type": "application/json",
     },
     body: option === "GET" ? undefined : JSON.stringify(obj ? obj : {}),
   });
   return await res.json();
 };
 export { myFetch };