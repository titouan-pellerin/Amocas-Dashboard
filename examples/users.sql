/*Récupérer toutes les informations d'un adhérent*/

SELECT
    adherents.*,
    addresses.*,
    users.*
FROM
    adherents
    INNER JOIN users ON users.UserID = adherents.UserID
    INNER JOIN addresses ON adherents.AddressID = addresses.AddressID
WHERE
    adherents.UserID = 1



/*Ajouter un animateur*/
BEGIN;
INSERT INTO
    users (
        UserID,
        LastName,
        FirstName,
        Password,
        EmailAddress
    )
VALUES
    (NULL, 'Animateur', 'Animateur', 'password', 'animateur@gmail.com');

INSERT INTO
    trainers (
        UserID,
        Phone
    )
VALUES
    (LAST_INSERT_ID(), "+33781841863");
COMMIT;

/*Ajouter un administrateur*/
BEGIN;

INSERT INTO
    users (
        UserID,
        LastName,
        FirstName,
        Password,
        EmailAddress
    )
VALUES
    (
        NULL,
        'Administrateur',
        'Administrateur',
        'password',
        'administrateur@gmail.com'
    );

INSERT INTO
    administrator (UserID)
VALUES
    (LAST_INSERT_ID());

COMMIT;

/*Ajouter un adhérent*/
BEGIN;
INSERT INTO
    users (
        UserID,
        LastName,
        FirstName,
        Password,
        EmailAddress
    )
VALUES
    (
        NULL,
        'Adhérent',
        'Adhérent',
        'password',
        'adhérent@gmail.com'
    );
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO
    addresses (AddressID, AddressFirstLine, AddressSecondLine, City, PostalCode)
VALUES
    (NULL, "23 Maufaireee", "Second Line", "Rennes", "35000");

INSERT INTO
    adherents (UserID, BirthDate, Gender, RegistrationDate, Phone1, Phone2, AddressID)
VALUES 
    (@last_user_id, "2001-09-12", "male", "2021-01-27", "+33781841863", NULL, LAST_INSERT_ID());

COMMIT;