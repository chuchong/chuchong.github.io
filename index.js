function Foo(msg = 'foo'){
    this.foo = msg
    return msg
}

[console.debug(new Foo().foo), console.debug(new Foo({foo:'bar'}).foo)]