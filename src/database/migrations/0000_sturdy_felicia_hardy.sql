CREATE TABLE "usuarios" (
	"UUID_user" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Primeiro_nome" varchar(100) NOT NULL,
	"Sobrenome" varchar(100) NOT NULL,
	"E-Mail" varchar(255) NOT NULL,
	"Telefone" varchar(20),
	"Senha" varchar(255) NOT NULL,
	"CPF" varchar(11) NOT NULL,
	"Data_de_nascimento" date NOT NULL,
	"Tipo_de_perfil" varchar(50) NOT NULL,
	"Data_de_criacao" timestamp DEFAULT now() NOT NULL,
	"Data_de_modificacao" timestamp DEFAULT now() NOT NULL,
	"Status" varchar(20) DEFAULT 'ATIVO' NOT NULL,
	"Deleted_at" timestamp,
	CONSTRAINT "usuarios_E-Mail_unique" UNIQUE("E-Mail"),
	CONSTRAINT "usuarios_CPF_unique" UNIQUE("CPF")
);
