--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(255) NOT NULL,
    body text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category_id integer
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    post_type integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: gifs; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.gifs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(255),
    image_url text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.gifs OWNER TO postgres;

--
-- Name: gifs_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.gifs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gifs_id_seq OWNER TO postgres;

--
-- Name: gifs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.gifs_id_seq OWNED BY public.gifs.id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.articles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email text NOT NULL,
    password character varying(255) NOT NULL,
    role integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: gifs id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.gifs ALTER COLUMN id SET DEFAULT nextval('public.gifs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.articles (id, user_id, title, body, created_at, category_id) FROM stdin;
1	15	Post number three	Adding a posst with timestamp	2019-11-01 15:56:34.657547	\N
2	15	Post number four	Adding a posst with timestamp and category	2019-11-05 05:47:09.643175	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.categories (id, name, created_at) FROM stdin;
2	New name	2019-11-05 06:20:39.303224
3	Quotes	2019-11-05 06:22:13.282249
4	Tips	2019-11-05 06:22:25.289315
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.comments (id, user_id, post_id, post_type, created_at) FROM stdin;
\.


--
-- Data for Name: gifs; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.gifs (id, user_id, title, image_url, created_at) FROM stdin;
5	15	Database	http://res.cloudinary.com/makos24/image/upload/v1573545077/teamwork/vxkojmfohehhhxwaqrr8.jpg	2019-11-12 07:51:17.301242
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (id, name, email, password, role, created_at) FROM stdin;
1	John Doe	email@test.com	password	1	2019-11-01 17:04:56.764797
7	John Doe	jdee@mail.com	$2b$10$YiH3X3emeMoPzStyUDIF5eCJQwXNv/8oqlmepRFdoHYu5D5vYe2N6	1	2019-11-01 17:04:56.764797
11	Jane Doe	jaydee@mail.com	$2b$10$OfjgDV5eS9p7JmRtbZ2xreK2rmY2n1JfT3ui0u59TK0sPCz7xzHCO	1	2019-11-01 17:04:56.764797
12	John Doe	jd-eoe@mail.com	$2b$10$5zEvXdgi4T6NoeSqV3Kz4.4VTPgTxeOvTDB7NBz3VyOY7dMrTIcWy	1	2019-11-01 17:04:56.764797
14	John Doe	jd-yeoe@mail.com	$2b$10$6MBj48la63t4HxDmkD9jQ.b1C1CkbToKovsz0zcpxODm19uMjV2b.	1	2019-11-01 17:04:56.764797
15	Employee User	test@mail.com	$2b$10$.YiqKBhVy9GpZvrpzkyqBOePnl1TyiqofDFaGVMJKQ0Gs4f5qfFVW	2	2019-11-01 17:04:56.764797
16	Employee Two	second@mail.com	$2b$10$Fy4YOkTvfMDHxJZ2svCR6uyZQO5MjEPTaV/y0vNrB8h3AdR7oTBsG	2	2019-11-01 17:08:36.699129
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.categories_id_seq', 4, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: gifs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.gifs_id_seq', 5, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.posts_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: gifs gifs_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

