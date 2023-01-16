import * as vscode from "vscode";
import { writeFileSync, existsSync, lstatSync, readFileSync } from "fs";
import { join } from "path";
import * as mkdf from "node-mkdirfilep";
function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function createFile(root:string,fileList: any[]) {
  fileList.forEach((item:any)=>{
         const folder = join(root, item.fileName);
          mkdf.create(folder);
          if (item.templates) {
             let templateContent = eval("`" + getTemplate(item.fileName) + "`");
            writeFileSync(folder,templateContent);
          }
          if (item.fileType==="folder") {
            if (item.chilren&&item.chilren.length>0) {
              createFile(folder,item.chilren);
            }
          }
  });
}
function getTemplate(fileName: string) {
  const template_path = join(__dirname, "..", "templates");
  vscode.window.showInformationMessage(`文件路径为${template_path}`);
  return readFileSync(join(template_path, fileName), "utf8");
}
export function createFileGenerator(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.createFileGenerator",
      (uri: any) => {
        vscode.window
          .showInputBox({
            ignoreFocusOut: true,
            placeHolder: "Path...",
            prompt: "创建文件的目录为....",
            value: uri.path,
          })
          .then((pluginPath) => {
            if (!pluginPath) {
              vscode.window.showInformationMessage(`文件路径为空`);
              return;
            }

            const types = ["model", "page"];
            vscode.window
              .showQuickPick(types, {
                ignoreFocusOut: true,
              })
              .then((type) => {
                if (type==="model") {
                 const  fileNameList= [
                 {
                  fileType:'folder',
                  fileName:"model/",
                  templates:false,
                  chilren:[{
                    fileType:'file',
                    fileName:"consts.ts",
                    templates:false,
                   },
                   {
                    fileType:'file',
                    fileName:"index.ts",
                    templates:true,
                   },
                   {
                    fileType:'file',
                    fileName:"types.ts",
                    templates:true,
                   },{
                    fileType:'file',
                    fileName:"utils.ts",
                    templates:true,
                   },{
                    fileType:'folder',
                    fileName:"hooks/",
                   },
                   {
                    fileType:'folder',
                    fileName:"computed/",
                    chilren:[{
                      fileType:'file',
                      fileName:"useTest.ts",
                      templates:true,
                    }]
                   }
                  ]
                 }];
                 createFile(pluginPath,fileNameList);
                }
                
              });
          });
      }
    )
  );
}
