function loadDatabase(){
  let database=JSON.parse(localStorage.getItem("database")) || [];
  return database;
}

function save(database){
  localStorage.setItem("database", JSON.stringify(database));
}
export default save;
export {loadDatabase};