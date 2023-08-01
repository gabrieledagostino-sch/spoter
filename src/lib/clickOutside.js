export function clickOutside(node) {
    const handleClick = event => {
        console.log("action taken");
        if(node && !node.contains(event.target) && !event.defaultPrevented) 
        {
            node.dispatchEvent(new CustomEvent('clickedOut', node))
        }
    }
    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}