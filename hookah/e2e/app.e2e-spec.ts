import { HookahPage } from './app.po';

describe('hookah App', () => {
  let page: HookahPage;

  beforeEach(() => {
    page = new HookahPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
