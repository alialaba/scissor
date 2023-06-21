## Crate root src folder 
- create config folder
- create models folder
- create routes folders



1.store original url in  request body
2. store base url
3. store the url id
4. if valdate the orignal url 
  i. using trycatch
  ii. search original url already exist in db
 iii. If found, we return the data in JSON
 iv. else create shorturl with base and urlid
 v. then create obj origiurl, shorturl, urlid and date
 vi. save url then return the data in JSOn
 vii. catch error return status 400 json server err
5. else return status 400 json (invalid url)


//axios to call api
//axios.post()
//install axios
//hook for user