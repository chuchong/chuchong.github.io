const root = { 'id': 0,
  'title': '导航标签',
  'expand': true,
  'children':
           [{ 'id': 1,
             'title': '日志导航',
             'expand': true,
             'children':
               [{
                 'id': 3,
                 'title': '我的第一篇日志',
                 'a': 'blog/first_diary.html',
                 'children': [] },
               { 'id': 4,
                 'title': 'windows下jekyll配置+套模板使用',
                 'a': 'blog/jekyll_under_windows.html',
                 'children': [] },
               { 'id': 4,
                 'title': '第二次作业读取表达式',
                 'a': 'blog/second_diary.html',
                 'children': [] },
               { 'id': 4,
                 'title': '服务器实验小结',
                 'a': 'blog/server_diary.html',
                 'children': [] },
               { 'id': 4,
                 'title': '前端综合实验后记',
                 'a': 'blog/final_diary.html',
                 'children': [] }
               ]
           },
           { 'id': 2,
             'title': 'tag 配置环境',
             'expand': true,
             'children':
               [{
                 'id': 4,
                 'title': 'windows下jekyll配置+套模板使用',
                 'a': 'blog/jekyll_under_windows.html',
                 'children': []
               }
               ]
           }
           ] }

let tree = new Tree({ 'container': '#tree-container',
  'tree': root,
  'clicked': function (id) { console.log('用户点击了 id 为', id, '的节点') } })
tree.setHide()
