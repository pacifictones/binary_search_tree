console.log("binary search tree");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  isEmpty() {
    return this.root === null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  search(root, value) {
    if (!root) {
      return false;
    } else {
      if (value === root.value) {
        return root;
      } else if (value < root.value) {
        return this.search(root.left, value);
      } else {
        return this.search(root.right, value);
      }
    }
  }

  buildTree(array) {
    const filteredArray = this.removeDuplicates(array);

    if (filteredArray.length === 0) return null;

    let middle = Math.floor(filteredArray.length / 2);
    let root = new Node(filteredArray[middle]);

    root.left = this.buildTree(filteredArray.slice(0, middle));
    root.right = this.buildTree(filteredArray.slice(middle + 1));

    return root;

    // console.log(sortedArray);
    // console.log(filteredArray);

    // filteredArray.forEach((element) => {
    //   this.insert(element);
    // });
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // sortedArray(array) {
  //   let res = [];
  //   let start = 0;
  //   let end = array.length - 1;
  //   if (start > end) {
  //     return null;
  //   }

  //   let mid = Math.round((start + end) / 2);
  //   let node = array[mid];
  //   res.push(node);
  //   this.buildTree(array.slice(0, mid));

  //   return res;
  // }

  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  inOrder(root, arr = []) {
    if (root) {
      this.inOrder(root.left, arr);
      console.log(root.value);
      arr.push(root.value);
      this.inOrder(root.right, arr);
    }
    return arr;
  }

  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }

  levelOrder() {
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let current = queue.shift();
      console.log(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  min(root) {
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.value = this.min(root.right);
      root.right = this.deleteNode(root.right, root.value);
    }
    return root;
  }

  height(value) {
    let node = this.search(this.root, value);
    console.log(node);
    return this.heightRecursive(node);
  }

  heightRecursive(node) {
    if (!node) {
      return 0;
    }
    return (
      1 +
      Math.max(
        this.heightRecursive(node.left),
        this.heightRecursive(node.right)
      )
    );
  }

  depth(value) {
    let node = this.search(this.root, value);

    return this.depthRecursive(this.root, node);
  }

  depthRecursive(root, node) {
    if (!root || root === node) {
      return 0;
    }
    if (node.value < root.value) {
      return 1 + this.depthRecursive(root.left, node);
    } else {
      return 1 + this.depthRecursive(root.right, node);
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const diff =
      this.heightRecursive(node.left) - this.heightRecursive(node.right);
    if (diff > 1 || diff < -1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    let arr = this.inOrder(this.root);
    console.log(arr);
    // this.root = null;
    this.buildTree(arr);
    console.log(this.root);
  }
}

const bst = new Tree([10, 5, 3, 15, 7, 4, 8, 11]);

console.log(bst.isBalanced());
console.log(bst.inOrder(bst.root));
console.log(bst.root);
console.log(bst.preOrder(this.root));
bst.rebalance();
console.log(bst.isBalanced());
