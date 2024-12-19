import { JetView, plugins } from 'webix-jet';
import { menudata } from '../../models/menudata';

export default class SidemenuView extends JetView {
    config() {
        var sidemenu = {
            id: 'sidemenu',
            cols: [
                {
                    rows: [
                        {
                            css: "menu",
                            padding: 2,
                            view: "form",
                            cols: [
                                {
                                    view: "icon", icon: "mdi mdi-menu",
                                    click: function () {
                                        $$("$sidebar1").toggle()
                                    }
                                }
                            ]
                        },
                        {
                            view: "sidebar",
                            collapsed: true,
                            position: "left",
                            data: menudata,
autowidth: true,
autoheight: true,                            
on: {
                                onclick: function () {
                                    webix.message("Clicked")
                                }
                            }
                        }
                    ]
                }
            ]
        }

        return sidemenu
    }

    init() {
        this.use(plugins.Menu, 'sidemenu');

    }
}
