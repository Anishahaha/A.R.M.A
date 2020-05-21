require("dotenv").config();
const { Client } = require("pg");

//To add data to Requests TABLE
/*
forum_name is name of the forum
unique_id is the id generated for this request
request_data is stringified json object containing data of the letter (letter fields)
rec_arr is an array of roll numbers of the requested faculty
*/
function addRequest(forum_name,unique_id,request_data,rec_arr, callback) {
  //returns status of registration (true or false)
  var client = new Client();
  client.connect();
  forum_name = forum_name.toUpperCase();

  client.query(
    "insert into requests(forum_name,unique_id,request_data,status,remarks) values ($1,$2,$3,'PENDING','No remarks have been given yet.');",
    [forum_name,unique_id,request_data],
    (err, res) => {
      if (err) {
        client.end();
        return callback(err, undefined);
      }

      else{
        var req_id=0;
        client.query(
          "SELECT request_id from requests where unique_id=$1;",
          [unique_id],
          (err, res) => {
            if (err) {
              client.end();
              return callback(err, undefined);
            } else {
              req_id=res.rows[0].request_id;
              console.log(req_id);
              for(let i=0;i<rec_arr.length;i++)
              {
                let temp=req_id;
                client.query(
                  "insert into recipients(request_id,faculty_roll) values($1,$2);",
                  [req_id,rec_arr[i]],
                  (err, res) => {
                    if (err) {
                      client.end();
                      return callback(err, undefined);
                    }
                    else{
                      if(i==rec_arr.length-1){
                        client.end();
                        return callback(undefined,true);
                      }
                    }

                  }
                );
              }
            }
          }
        );
      }
    }
  );
}
// let details = {
//             designation: "HOD",
//             department: "CSE",
//             subject: "Prmission for attendance during quarantine ",
//             date: "today",
//             respects: "MX",
// }
// let data = JSON.stringify(details);
// addRequest('CODINGSTUDIO','1346789',data,['16P61A05M0','18P61A05J1','18P61A05C2'],(err,state) => {
//   console.log(err||state);
// });
//
// module.exports={
//   addRequest:addRequest
// }