
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
        node = node.parent;
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
        
        var nc = findParentWithComponent(node);
        if(nc){
            node.___parentNodeWithComponent = nc;
            var name = nc.component.id;
            if(!name){
                for(var fn in nc.component){
                    if(nc.component[fn].prototype){
                        name = nc.component[fn].prototype;
                        break;
                    }
                }
            }
            node.___parentComponentName = name;
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
