/*
var util =require('util');
var error=clc.red.bold, warn=clc.yellow, notice=clc.blue, success=clc.green;
*/
// IDEA: DEFAULT
var path = require('path'),
    Argv = require('minimist')(process.argv);
// IDEA: COMMON PACKAGE
var fs = require('fs-extra'),
    clc = require('cli-color'),
    extend = require('node.extend'),
    DOMParser = require('xmldom').DOMParser;
// IDEA: REQUIRE PACKAGE
var Message = {
    "NoOS": "No OS specified: {-- --os=?}",
    "NoOSValid": "the specified: {os} is not valid",
    "DataCopied": "Data Copied...",
    "MsgOk": "Ok: {msg}",
    "MsgError": "{msg}"
};
// NOTE: REQUIRE DATA
var Package = JSON.parse(fs.readFileSync('package.json'));
// NOTE: SETTING, TASK
var Setting = {},
    Task = {
        todo: [],
        init: function() {
            //development\tagTemptask.tmp.html
            // var Template = document.createElement( 'html' );
            // Template.innerHTML(fs.readFileSync('development/tagTemptask.tmp.html'));
            // var Template = fs.readFileSync('development/tagTemptask.tmp.html','utf8');
            // fs.readFile('development/tagTemptask.tmp.html','utf8',function(err, html){
            //     // console.log(err, html);
            //     // var parser=new DOMParser();
            //     // document=parser.parseFromString(html, "text/html");
                // textarea = html.createElement('textarea');
                // textarea.id = "t100";
                // html.body.appendChild(textarea);
            //     var doc = new DOMParser().parseFromString(html);
            // });
            var Template = new DOMParser().parseFromString(fs.readFileSync('development/tagTemptask.tmp.html','utf8'),'utf8');
            var textarea = Template.createElement('textarea');
            textarea.id = "t100";
            Template.appendChild(textarea);
            console.log(Template.toString());

        },
        create: {
            production: function(dir, callback) {
                dir.Exists(function(err) {
                    if (err) {
                        // NOTE: directory exists
                        dir.Empty(function(err) {
                            // NOTE: make it empty
                            if (err) {
                                Task.exit(err);
                            } else {
                                callback('current directory destroyed and rebuild empty!');
                            }
                        });
                    } else {
                        // NOTE: new directory
                        dir.Create(function(err) {
                            if (err) {
                                Task.exit(err);
                            } else {
                                callback('new directory created!');
                            }
                        });
                    }
                });
            }
        },
        read: {
            development: function(o, callback) {
                fs.readdirSync(o).forEach(function(fileName) {
                    var dir = path.join(o, fileName);
                    var file = path.parse(dir);
                    var state = fs.statSync(dir);
                    if (state.isFile()) {
                        file.src = dir;
                        var dirName = file.dir.split(path.sep).pop();
                        if (dirName == Setting.development.root) {
                            if (Object.keys(Setting.production.file.root).every(function(reg) {
                                    return new RegExp(reg).test(fileName) === Setting.production.file.root[reg];
                                })){
                                    if (Setting.development.main == file.name && file.ext == '.html') {
                                        file.des = path.join(Setting.production.dir, Setting.production.main + file.ext);
                                    }else{
                                        file.des = path.join(Setting.production.dir, fileName);
                                    }
                                callback(file, state);
                            }
                        } else {
                            if (Object.keys(Setting.production.file[dirName]).every(function(reg) {
                                console.log(dirName,reg);
                                    return new RegExp(reg).test(fileName) === Setting.production.file[dirName][reg];
                                })) {
                                file.des = path.join(dir.replace(Setting.development.root, Setting.production.dir));
                                callback(file, state);
                            }
                        }
                    } else if (state.isDirectory()) {
                        if (Setting.production.file.hasOwnProperty(fileName)) Task.read.development(dir, callback);
                    }
                });
            }
        },
        copy: function(callback) {
            if (Task.todo.length) {
                var file = Task.todo.shift();
                file.Copy(function(err) {
                    if (err) {
                        Task.msg.error(Message.MsgError.replace('{msg}', err));
                    } else {
                        Task.msg.success(Message.MsgOk.replace('{msg}', file.src));
                    }
                    Task.copy(callback);
                });
            } else {
                callback();
            }
        },
        msg: {
            error: function(msg) {
                console.log(clc.red(msg));
            },
            success: function(msg) {
                console.log(clc.green(msg));
            }
        },
        exit: function(msg) {
            Task.msg.error(msg);
            process.exit(0);
        }

    };
Object.defineProperties(Object.prototype, {
    Exists: {
        value: function(callback) {
            // HACK: callback(fs.existsSync(this.toString()));
            fs.exists(this.toString(), function(error) {
                callback(error);
            });
        }
    },
    Create: {
        value: function(callback) {
            fs.ensureDir(this.toString(), callback);
        }
    },
    Empty: {
        value: function(callback) {
            fs.emptyDir(this.toString(), callback);
        }
    },
    Copy: {
        value: function(callback) {
            fs.copy(this.src.toString(), this.des.toString(), function(error) {
                callback(error);
            });
        }
    },
    Read: {
        value: function(callback) {
            var o = this.toString();
            fs.readdirSync(o).forEach(function(fileName) {
                var dir = path.join(o, fileName);
                var file = path.parse(dir);
                var state = fs.statSync(dir);
                // HACK: file.src=dir;
                // HACK: file.dest='';
                callback(dir, file, state);
            });
        }
    }
});
Task.init();