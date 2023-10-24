import interact from "interactjs";

export const animate = (t, options={}) => {
    let x = 0;
    let y = 0;
    let rotation = 0;
    const threshold = options.threshold ?? 100;
    const rotDeg = options.rotDeg ?? 15;

    interact(t).draggable({
        onstart: (e) => {
            const target = e.target;
            target.setAttribute('dragging',true);
            target.dispatchEvent(new CustomEvent('dragin'))

            x = 0;
            y = 0;
            rotation = 0;

            target.style.setProperty('--card-x', `${x}px`);
            target.style.setProperty('--card-y', `${y}px`);
            target.style.setProperty('--rot-deg', `${rotation}deg`);
        },
        onmove: (e) => {
            const target = e.target;
            
            x += e.dx;
            y += e.dy;
            
            rotation = rotDeg * (x / threshold);
            rotation = Math.sign(rotation) * Math.min(Math.abs(rotation), rotDeg);
            
            target.style.setProperty('--card-x', `${x}px`);
            target.style.setProperty('--card-y', `${y}px`);
            target.style.setProperty('--rot-deg', `${rotation}deg`);
        },
        onend: (e)=>{
            const target = e.target;
            target.setAttribute('dragging', false);
            target.dispatchEvent(new CustomEvent('dragout'))
            let moved = (Math.sqrt(Math.pow(e.pageX - e.x0, 2) + Math.pow(e.pageY - e.y0, 2) | 0));
            if(moved > threshold){
                target.dispatchEvent(new CustomEvent('swiped', {
                    detail: x>0?'right':'left'
                }))
            }else{
                x = 0;
                y = 0;
                rotation = 0;    
            }

            target.style.setProperty('--card-x', `${x}px`);
            target.style.setProperty('--card-y', `${y}px`);
            target.style.setProperty('--rot-deg', `${rotation}deg`);
        }
    })
    .styleCursor(false);
};