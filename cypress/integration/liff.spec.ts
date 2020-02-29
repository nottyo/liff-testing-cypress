/// <reference types="Cypress" />
import LINE from '@LINE/bot-sdk';
import { locators } from '../fixtures/locators';

const profile: LINE.Profile = {
  displayName: 'mockDisplayName',
  userId: '[mock]U1234567890',
  pictureUrl: 'https://ourfunnylittlesite.com/wp-content/uploads/2018/07/1-4-696x696.jpg',
  statusMessage: 'liff is controlled by Cypress'
}

describe('LIFF App Test', () => {

  beforeEach(() => {
    cy.viewport('macbook-15')
    cy.visit(Cypress.config('baseUrl') as string, {
      onBeforeLoad: (window: any) => {
        
        const openWindowMock = (params: any) => {
          expect(params).to.have.property('url')
        }
        const sendMessagesMock = ((messages: LINE.Message[]) => {
          expect(messages.length).to.eq(1)
        })
        window.Cypress.liffMock = {
          init: cy.stub().as('init').resolves(),
          isLoggedIn: cy.stub().as('isLoggedIn').returns(true),
          getProfile: cy.stub().as('getProfile').resolves(profile),
          isInClient: cy.stub().as('isInClient').returns(true),
          getOS: cy.stub().as('getOS').returns('web'),
          getLanguage: cy.stub().as('getLanguage').returns(navigator.language),
          getVersion: cy.stub().as('getVersion').returns('9999'),
          getFriendship: cy.stub().as('getFriendship').resolves({
            friendFlag: true
          }),
          openWindow: cy.stub().as('openWindow').callsFake(openWindowMock),
          sendMessages: cy.stub().as('sendMessages').callsFake(sendMessagesMock),
          getAccessToken: cy.stub().as('getAccessToken').returns('myAccessToken'),
          getDecodedIDToken: cy.stub().as('getDecodedIDToken').resolves({
            "iss": "https://access.line.me",
            "sub": "U1234567890abcdef1234567890abcdef ",
            "aud": "1234567890",
            "exp": 1504169092,
            "iat": 1504263657,
            "nonce": "0987654asdf",
            "amr": [
                "pwd"
              ],
            "name": "Taro Line",
            "picture": "https://sample_line.me/aBcdefg123456"
          })
        };
      }
    })
  })

  it('should display mock profile image', () => {
    cy.get(locators.profileImage).should('have.attr', 'src', profile.pictureUrl);
  })

  it('should be able to open window', () => {
    cy.get(locators.openWindowBtn).click()
    cy.get('@openWindow').should('be.calledOnce')
  })

  it('should be able to send message', () => {
    cy.get(locators.sendMessageBtn).click()
    cy.get('@sendMessages').should('be.calledOnce')
    cy.get('.swal2-confirm').click()
  })

  it('should be able to render in different viewport', () => {
    cy.viewport('iphone-xr')
    cy.get(locators.isInClient).should('have.text', 'true')
  })

  it('should handle liff init failure', () => {
    const liffInitError = {
      code: 'INIT_FAILED',
      message: 'Failed to init LIFF SDK.'
    }
    cy.visit(Cypress.config('baseUrl') as string, {
      onBeforeLoad: (window: any) => {
        window.Cypress.liffMock = {
          init: cy.stub().as('initFailed').rejects(liffInitError)
        }
      }
    })
    cy.get(locators.sweetAlert.content).should('have.text', liffInitError.message)
    cy.get(locators.sweetAlert.confirmBtn).click()
  })

  
})
