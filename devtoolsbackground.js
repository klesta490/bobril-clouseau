
function render(){
    function shallowCopy(node){
        var keys = Object.keys(node);
        var r = {};
        for(var i = 0; i < keys.length;i++){
            var k = keys[i];
            r[k] = node[k];
        }
        return r;
    }
    function findParentWithComponent(node){
        while(node && !node.component){
            node = node.parent;
        }
        
        return node;
    }

    function getBobrilNode(){
        if(!window.b || !$0)
            return undefined;

        var node = b.deref($0);
        if(!node)
            return undefined;
        node = shallowCopy(node);
        if(!node.component){
            var nc = findParentWithComponent(node);
            node.___nearestComponent = nc ? nc.component: undefined;
        }
        
        return node;
    }
    
    return getBobrilNode();
}


chrome.devtools.panels.elements.createSidebarPane("Bobril",
  function(sidebar) {
    function actualizeSidebar(){
        sidebar.setExpression("(" + render.toString() + ")()");
    };
    
    actualizeSidebar();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(actualizeSidebar);
});
