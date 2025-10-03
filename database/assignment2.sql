-- 1) Insert into account table 
INSERT INTO public.account (
	account_firstname, 
	account_lastname,
	account_email, 
	account_password
)
VALUES (
	'Tony', 
	'Stark', 
	'tony@starkent.com', 
	'Iam1ronM@n'
);

-- 2) Update Tony Stark account type to Admin
UPDATE 
    public.account
SET 
    account_type = 'Admin'
WHERE 
    account_id = 1;

-- 3) Delete Tony Stark account 
DELETE FROM 
    public.account
WHERE 
    account_id = 1;

-- 4) Replace the 'small interiors' desc with 'a huge interior'
UPDATE
	public.inventory
SET 
	inv_description = REPLACE(inv_description, 'small interiors',
	'a huge interior')
WHERE 
	inv_id = 10;

-- 5) Inner Join 
SELECT 
	i.inv_id, 
	i.inv_make, 
	i.inv_model,
	c.classification_id,
	c.classification_name
FROM 
	public.inventory i
INNER JOIN public.classification c
	ON i.classification_id = c.classification_id; 

-- 6) 
UPDATE 
	public.inventory
SET 
	inv_image = REPLACE(inv_image, '/images', 
	'/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', 
	'/images/vehicles');

