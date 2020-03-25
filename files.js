const path = require('path');
const fs = require('fs');

let directoryPath =  __dirname;

function getFileStructure(directoryPath){

    fs.readdir(directoryPath, function( error, files){
        if(error){
            console.log(error);
            console.log("Unable to Scan Directory.");
            return;
        }
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
            // console.log("typeof file",typeof file);
            if(file[0] == '.'){
                console.log("starts with `.`");
            }
            else{
                let tempPath  = directoryPath + `/${file}`;
                // console.log("File Path is -", tempPath);
                // console.log("file kya hai ?");
                fs.lstat(tempPath, function(err, stats){

                    if(err){
                        console.log("error encountered");
                        console.log(err);
                        return;
                    }

                    if(stats.isDirectory()){
                        
                        // console.log("filePath -", tempPath);
                        console.log(file, " - Directory");
                        console.log("->");
                        if(file == 'node_modules'){

                        }
                        else{
                            getFileStructure(tempPath);
                        }
                    }
                    else{
                        console.log(file, " - File");
                    }
                }); 
                // console.log(stat.isDirectory());
            }
        });
    })

}
getFileStructure(directoryPath);

// fs.readdir(directoryPath, function( error, files){
//     if(error){
//         console.log("Unable to Scan Directory.");
//         return;
//     }
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file);
//         // console.log("typeof file",typeof file);
//         if(file[0] == '.'){
//             console.log("starts with `.`");
//         }
//         else{
//             let tempPath = __dirname + `./${file}`;
//             console.log("File Path is -", tempPath);
//         }
//     });
// })