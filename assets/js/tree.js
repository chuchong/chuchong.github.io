
class Node {
  constructor (treeObj, par, clicked, gTree) {
    this.id = treeObj['id']
    this.title = treeObj['title'] || ''
    this.expand = treeObj['expand'] || false// 如果undefined,就设置成false
    this.children = []
    this.sonHeight = 0/* 子节点的总个数,用于设置最大高度 */

    /* 每个节点都装在li格子里
          内部先有一个span存储名称
          之后有另一个ul格子存储子节点
          */
    let ele = document.createElement('li')
    ele.onclick = this.onClick(this.id, clicked)
    let titleSpan = document.createElement('span')
    titleSpan.id = this.id
    ele.appendChild(titleSpan)

    let titleTxt = document.createElement('span')/* 存储名称的格子 */

    if (treeObj.hasOwnProperty('a')) {
      let link = document.createElement('a')
      link.href = treeObj['a']
      titleTxt.appendChild(link)
      link.innerText = this.title
      titleTxt.className = 'title-unclicked'
      titleTxt.onclick = gTree.clickText(titleTxt, gTree)
    } else {
      titleTxt.innerText = this.title
      titleTxt.className = 'title-unclicked'
      titleTxt.onclick = gTree.clickText(titleTxt, gTree)
    }

    if (treeObj['children'].length === 0) {
      this.children = []
      titleSpan.appendChild(titleTxt)
    } else {
      /* 有子节点,需要一个toggler来显示是否已经下拉 */
      let toggler = document.createElement('span')
      let nextPar = document.createElement('ul')
      if (this.expand === false) {
        nextPar.className = 'ul-close'
        toggler.className = 'toggle-close'
      } else {
        nextPar.className = 'ul-open'
        toggler.className = 'toggle-open'
      }

      /* 添加子节点,统计子节点高度 */
      for (let obj in treeObj['children']) {
        this.children.push(new Node(treeObj['children'][obj], nextPar, clicked, gTree))
        this.sonHeight = this.sonHeight + this.children[obj].sonHeight + 1
      }

      titleSpan.appendChild(titleTxt)
      titleSpan.appendChild(toggler)
      ele.appendChild(nextPar)

      /* 设置当前格子最大高度以使动画效果流畅,添加onclick */
      nextPar.style.maxHeight = this.sonHeight * 25
      toggler.onclick = this.toggle(toggler, this)
    }
    par.appendChild(ele)
  }

  /* 点击下拉三角触发的函数,决定是否显示子节点 */
  toggle (eve, node) {
    let ulEle = eve.parentNode.nextElementSibling
    return function () {
      if (node.expand === false) { // 有些undefined
        node.expand = true
        ulEle.className = 'ul-open'
        eve.className = 'toggle-open'
      } else {
        node.expand = false
        ulEle.className = 'ul-close'
        eve.className = 'toggle-close'
      }
    }
  }

  /* 点击触发的clicked函数 */
  onClick (id, clicked) {
    return function () {
      clicked(id)
      event.stopPropagation()// 防止扩散到父节点
    }
  }
}

class TreeNode {
  constructor (treeObj, container, clicked) {
    this.clicked = clicked || null

    this.ul = document.createElement('ul')
    this.ul.className = 'treeUl'
    this.div = document.createElement('div')
    this.div.className = 'treeDiv'
    this.div.appendChild(this.ul)

    container.appendChild(this.div)
    this.root = new Node(treeObj, this.ul, this.clicked, this)
    this.gNode = 0
  }

  clickText (node, gTree) {
    return function () {
      if (gTree.gNode === 0) {
        node.className = 'title-clicked'
        gTree.gNode = node
      } else if (gTree.gNode !== node) {
        gTree.gNode.className = 'title-unclicked'
        node.className = 'title-clicked'
        gTree.gNode = node
      } else {
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
class Tree {
  constructor (Obj) {
    let clicked = Obj['clicked'] || null
    let containers = document.querySelectorAll(Obj['container'])
    let treeObj = Obj['tree']

    this.treeNodes = []
    console.assert(containers.length !== 0)
    for (let id = 0; id < containers.length; id++) {
      this.treeNodes.push(new TreeNode(treeObj, containers[id], clicked))
    }
  }

  setHide () {
    for (let id = 0; id < this.treeNodes.length; id++) {
      this.treeNodes[id].div.classList.add('treeDiv_hide')
      this.treeNodes[id].div.classList.remove('treeDiv_show')
    }
  }

  setShow () {
    for (let id = 0; id < this.treeNodes.length; id++) {
      this.treeNodes[id].div.classList.add('treeDiv_show')
      this.treeNodes[id].div.classList.remove('treeDiv_hide')
    }
  }
}
