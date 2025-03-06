describe('qa.studio', function () {

            it('верный логин и верный пароль', function () {
                cy.visit('https://login.qa.studio/'); // посетить сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки вост. пароль
      
                cy.get('#mail').type('german@dolnikov.ru'); // ввели верный логин
                cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
                cy.get('#loginButton').click(); // нажал войти

                cy.wait(5000)

                cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверяю что после авт. вижу текст
                cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
            })

            it('проверка востановления пароля', function () {
                cy.visit('https://login.qa.studio/'); // посетить сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки вост. пароль
       
                cy.get('#forgotEmailButton').click(); // нажал забыл пароль
                cy.get('#mailForgot').type('german@dolnikov.ru'); // ввел почту для востановления
                cy.get('#restoreEmailButton').click(); // нажать кноплу отправить код
    
                cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');// проверяю текст на совпадение
                cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
            })

            it('верный логин и неверный пароль', function () {
                cy.visit('https://login.qa.studio/'); // посетить сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки вост. пароль
   
                cy.get('#mail').type('german@dolnikov.ru'); // ввели верный логин
                cy.get('#pass').type('iLoveqastudio7'); // ввели неверный пароль
                cy.get('#loginButton').click(); // нажал войти

                cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверяю что после авт. вижу текст
                cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
            })

            it('НЕправильный логин и правильный пароль', function () {
                cy.visit('https://login.qa.studio/'); // посетить сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки вост. пароль
   
                cy.get('#mail').type('man@dolnikov.ru'); // ввели неправильный логин
                cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
                cy.get('#loginButton').click(); // нажал войти

                cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверяю что после авт. вижу текст
                cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
            })

            it('проверка что в логине есть @', function () {
                cy.visit('https://login.qa.studio/'); // посетить сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки вост. пароль
       
                cy.get('#mail').type('germandolnikov.ru'); // ввели логин без @
                cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
                cy.get('#loginButton').click(); // нажал войти
    
                cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// проверяю что после авт. вижу текст
                cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
            })

            it('приведение к строчным буквам в логине', function () {
                cy.visit('https://login.qa.studio/'); // посетить сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки вост. пароль
           
                cy.get('#mail').type('GerMan@Dolnikov.ru'); // строчным буквам в логине
                cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
                cy.get('#loginButton').click(); // нажал войти
        
                cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверяю что после авт. вижу текст
                cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
            })
})
describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');                     // вводим номер карты
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
         cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });
