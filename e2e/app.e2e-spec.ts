import { FoobotExporterPage } from './app.po';

describe('foobot-exporter App', function() {
  let page: FoobotExporterPage;

  beforeEach(() => {
    page = new FoobotExporterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
