import {SpectronMain} from '../../js/test/SpectronMain';
import {DialogWindowService} from '../../js/ui/dialog_window/DialogWindowService';

SpectronMain.run(async state => {

    let dialogWindowService = new DialogWindowService();
    await dialogWindowService.start();

    state.window.loadURL(`file://${__dirname}/app.html`);

});
