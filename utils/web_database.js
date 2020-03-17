(function () {
    class WebDataBase {
        constructor(opts) {
            this.indexdb = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
            if (!this.indexdb) throw console.error('Error:你的浏览器不支持 indexdb 服务!!!请升级浏览器再尝试~~()');
            this.IDBOpenDBRequest = this.indexdb.open(opts.name, opts.version);
            // this.initialization();
        }
        initialization(opts) {
            this.IDBOpenDBRequest.onsuccess = function (ev) {
                console.log(ev.target);
                ev.target.onupgradeneeded = function (ev) {
                    this.db = ev.target.result; // 获取到 demoDB对应的 IDBDatabase实例,也就是我们的数据库。
                    if (!db.objectStoreNames.contains(personStore)) {
                        //如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
                        // objectStore就相当于数据库中的一张表。IDBObjectStore类型。
                        let objectStore = db.createObjectStore(opts.dbname, {
                            keyPath: opts.keyPath,
                            autoIncrement: opts.autoIncrement
                        });
                        //指定可以被索引的字段，unique字段是否唯一。类型： IDBIndex
                        objectStore.createIndex('name', 'name', {
                            unique: true
                        });
                        objectStore.createIndex('phone', 'phone', {
                            unique: false
                        });
                    }
                    console.log('数据库版本更改为： ' + dbVersion);
                };
            }
            this.IDBOpenDBRequest.onerror = function (ev) {
                console.log(ev.currentTarget.error.message);
            };
            
        };
        add() {
            // 创建一个事务，类型：IDBTransaction，文档地址： https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction
            var transaction = db.transaction(personStore, 'readwrite');

            // 通过事务来获取IDBObjectStore
            var store = transaction.objectStore(personStore);

            // 往store表中添加数据
            var addPersonRequest = store.add({
            name: '老马',
            phone: '189111833',
            address: 'aicoder.com'
            });

            // 监听添加成功事件
            addPersonRequest.onsuccess = function(e) {
            console.log(e.target.result); // 打印添加成功数据的 主键（id）
            };

            // 监听失败事件
            addPersonRequest.onerror = function(e) {
            console.log(e.target.error);
            };
        };
        find() { };
        update() { };
        remove() { };
    }
    let db = new WebDataBase({
        name: "article",
        version: 1
    })
    db.initialization({
        dbname:"hositry",
        keyPath: 'id',
        autoIncrement: true
    })
    console.log(db);
}()); 