import { VentureOutPage } from './app.po';

describe('venture-out App', function() {
  let page: VentureOutPage;

  beforeEach(() => {
    page = new VentureOutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
