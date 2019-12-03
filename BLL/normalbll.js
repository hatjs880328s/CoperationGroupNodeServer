/*
 * @Author: your name
 * @Date: 2019-12-02 10:19:45
 * @LastEditTime: 2019-12-03 15:38:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/BLL/normalbll.js
 */
// /*
//  * @Author: your name
//  * @Date: 2019-11-30 21:15:32
//  * @LastEditTime: 2019-12-02 10:29:09
//  * @LastEditors: Please set LastEditors
//  * @Description: 处理业务代码
//  * @FilePath: /CoperationGroupNodeServer/BLL/normalbll.js
//  */




// /**
//  * 
// // 处理普通文件
// // 处理文件夹
// // 处理协同组文件
// // 处理协同组文件夹
// // 处理个人信息


//    除 CMD USER FOLDER FILE 基础的 CURD 外，其他的业务处理
//    1.个人信息bll处理
//    a.邀请某人进群
//  */

// /// 根据folderid获取协同组，组信息[包含文件、用户等；不单单是组信息]
// function getCoperationFolders(app, FolderdbIns, dbinstance) {
//   app.apiconfig.get('/coperationgroup/:id', function (req, res) {
//     var coperid = req.params.id;
//     console.log('get coperation group info[incloud users & files]');
//     // 1.获取folderdic
//     var folderDic = FolderdbIns.getFolderWith(dbinstance, id, function (req) { });
//     // 2.获取所有user信息
//     var userList =
//       // 3.获取文件信息
//   });
// }
