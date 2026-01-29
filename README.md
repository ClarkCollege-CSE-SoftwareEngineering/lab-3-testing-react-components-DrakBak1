Jarryd Toves
Professor Nicholas
1/29/2026


Reflection question 1: Using getbyrole with an accessible name reflects real user interaction with ui due to users interaction focuses around visible feedback like visibility or accessability labels. GetByTestId implements details users would never have to think about in contrast.


Reflection question 2: getByRole gives an error if the element doesn't exist so the test fails establishing the abscence of something. queryByRole returns null for no element found for safe asserts with no errors. This behavior is impoertant between user feedback and developer perspective.



Reflection question 3: getByText is synchronus which means it's used when the element should be present after rendering. If the element isn't found it gets tossed. findByText is asynchronus so will be used when an element appears after an operation asynchronus.

Key concept conclusion: This lab reinforced writing user focuses tests with the React Testing Library by focusing on semantic queries: roles, labels, visible text. I practiced testing realistic user interactions with userEvent which includes form submission, keyboard navigation, and validation behavior. API mock calls with Vitest, test asynchronous UI updates using findBy and waitFor, verify proper error handling, and edge cases were used to ensure the application behaves correctly under both success and failure conditions. This TDD method is a guide to better form the final product efficiently with well developed feedback that enables developers to be able to handle needed fixes where most pressing from the users perspective.