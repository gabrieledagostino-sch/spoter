export function clickOutside(node) {
    const handleClick = event => {
        if(node && !node.contains(event.target) && !event.defaultPrevented) 
        {
            node.dispatchEvent(new CustomEvent('clickedOut', node))
        }
    }
    const handleKey = event => {
        if(node && event.key === 'Escape') node.dispatchEvent(new CustomEvent('clickedOut', node))
    }
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKey, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('keydown', handleKey, true);
        }
    }
}