function bindRight(fn, rightArgs, n = Infinity){
  return function(...args){
    const allArgs = [...args.slice(0,n), ...rightArgs];
    return fn.apply(this, allArgs)
  }
}

const parseHex = bindRight(parseInt, [16], 1);
console.log(['0','1','2'].map(parseHex))