export const generateLightColor = (): string => {
    const letters = 'BCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

export const generateColor = (): string => {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

export const LightenDarkenColor = (hex: string, amount: number) => {
    // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        const color = hex.slice(1);
        let num = parseInt(color, 16);

        let r = (num >> 16) + amount;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amount;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amount;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return "#" + (g | (b << 8) | (r << 16)).toString(16);
    }
    throw new Error('Bad Hex');
}

export const hexToRgbA = (hex: string, alpha?: number) => {
    // https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
    const _alpha: number = alpha !== undefined ? alpha : 1;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        let color: string[] = hex.substring(1).split('');
        if (color.length == 3) {
            color = [color[0], color[0], color[1], color[1], color[2], color[2]];
        }
        const newColor: any = '0x' + color.join('');
        return 'rgba(' + [(newColor >> 16) & 255, (newColor >> 8) & 255, newColor & 255].join(',') + ',' + _alpha + ')';
    }
    throw new Error('Bad Hex');
}
