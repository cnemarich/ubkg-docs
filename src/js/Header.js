class Header extends App {
    constructor(el, args) {
        super(el, args)
        this.$ = {
            li: this.el.find('.js-header__menu ul li'),
            ul: this.el.find('.js-header__menu ul')
        }
        this.syncHeader()
    }


    async syncHeader() {
        if (!this.msgs.menu && typeof this.msgs.menu !== 'object') return
        let x = 1
        try {
            for (let li of this.msgs.menu) {
                this.log(`Menu ${x}`, li)
                let $li = this.$.li.eq(x)

                if ($li.length) {
                    $li.attr('class', li.class)
                    $li.find('a').text(li.name).attr('href', li.href)
                } else {
                    let $nLi = this.$.li.eq(1).clone()
                    $nLi.attr('class', li.class || null)
                    $nLi.find('a').text(li.name).attr('href', li.href ||  ('#' + this.toId(li.name)))
                    this.$.ul.append($nLi)
                }

                x++
            }
        } catch (e) {
            App.log('Error Building Menu: ', e, {error: true})
            App.log('Language file menu property should be in the format: ', [{name: 'Menu name here', href: '#url'}], {error: true})
        }
    }
}
