import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

describe('HexTile', () => {
    let element;

    beforeEach(() => {
        element = new HexTile();
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('defaults color to "rgb(26, 63, 169)"', () => {
        expect(element.color).toBe("rgb(26, 63, 169)");
    });

    it('defaults type to "pointed"', () => {
        expect(element.type).toBe("pointed");
    });

    it('defaults selected to false', () => {
        expect(element.selected).toBe(false)
    })

    it('selcting changes stroke color to #008bf8', () => {
        element.selected = true
        element.requestUpdate()
        expect(element.shadowRoot.querySelector('.st0').getAttribute('stroke')).toBe("#008bf8")
    })

    it('hides grid changes stroke color to transparent', () => {
        element.hideGrid = true
        element.requestUpdate()
        expect(element.shadowRoot.querySelector('.st0').getAttribute('stroke')).toBe("transparent")
    })

    it('dispatches tileClick event', () => {
        const spy = jest.fn()
        element.addEventListener('tileClick', spy)
        element.shadowRoot.querySelector('.st0-wrap').dispatchEvent(new MouseEvent('click'));
        expect(spy).toHaveBeenCalled()
    });
});
