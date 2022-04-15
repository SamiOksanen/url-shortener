CREATE TABLE weblink(
    weblinkid serial PRIMARY KEY,
    shortenedlink VARCHAR (20) UNIQUE NOT NULL,
    targeturl VARCHAR (255) UNIQUE NOT NULL
);
CREATE TABLE weblinkvisit(
    weblinkvisitid serial PRIMARY KEY,
    weblinkid INT NOT NULL,
    visitdt TIMESTAMP,
    FOREIGN KEY (weblinkid) REFERENCES weblink (weblinkid)
);

CREATE OR REPLACE FUNCTION random_string(length INTEGER) RETURNS TEXT AS
$$
DECLARE
  chars TEXT[] := '{0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result TEXT := '';
  i INTEGER := 0;
BEGIN
  IF length < 0 THEN
    raise exception 'Given length cannot be less than 0';
  END IF;
  FOR i IN 1..length LOOP
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  END LOOP;
  RETURN result;
END
$$ language plpgsql;

CREATE OR REPLACE FUNCTION create_unique_shortened_url(length INTEGER) RETURNS TEXT AS
$$
DECLARE
  result TEXT := '';
  i INTEGER := 0;
BEGIN
  WHILE i != 1 LOOP
    result := random_string(length);
   	IF (SELECT 1 FROM weblink WHERE shortenedlink = result) IS NULL THEN
    	i := 1;
  	END IF;
  END LOOP;
  RETURN result;
END
$$ language plpgsql;
