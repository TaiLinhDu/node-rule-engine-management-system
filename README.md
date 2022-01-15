# Prototyp zur Verwaltung der Geschäftsregeln

Die Anwendung ermöglicht es Ihnen, Geschäftsregeln (Wenn ...,dann ...) zu verwalten. Bei der Anwendung können Sie als Admin Rollen bzw. Zugriffsrechten auf Geschäftsregelnsätzen an anderen Nutzer vergeben. Die Nutzer mit derm Zugriffsrecht dürten die Geschäftsregeln einlesen und verarbeiten. 

Das Projekt bietet eine Anwendung mit der Benutzerverwaltung, Rollenverwaltung, Geschäftsregelverwaltung.

* Benutzerverwaltung ermöglicht die Authentifizierung der Nutzer
* Rollenverwaltung ermöglicht die rollenbasierte Zugriff auf die Ressourcen
* Geschäftsregelverwaltung bietet die Möglicheit, Geschäftsregelsatz zu erstellen und zu bearbeiten. Ein Repository steht hier für die Abspeichern der Geschäftsregelsätzen zur Verfügung.


Das Projekt benutzt  
* [json-rule-engine](https://github.com/CacheControl/json-rules-engine) als Regelvorlage und die Validierung.

* [json-rule-editor](https://raw.githubusercontent.com/vinzdeveloper/json-rule-editor) als das Webinterface zur Erstellung und Verarbeitung der Geschäftsregelnsätzen.

## Inhaltsübersicht

1. [Voraussetzung](#Voraussetzung)
2. [Anwendung Installieren](#project-structure)
3. [Benutzung der Anwendung](./backend/README.md)

---

## Voraussetzung
Für Deployen ist Docker und Docker-Compose für die Anwendung benötigt.

## Anwendung Installieren und Deployen
Auf dem Root-Verzeichnis:

Das Projekt bauen:

```bash
$ docker-compose build
```

Das Projekt laufen lassen:
```bash
$ docker-compose up
```
Das Frontend Server benuzt Port 80 (HTTP)
Das Backend Server benutzt Port 3000
Und Ein Mongo Server mit Port 27018


## Features
Die Anwendung beinhalte die Hauptwebseiten:
* `/home`
* `/login`
* `/register`
* `/admindashboard`
* `/ruledashboard`
* `/ruleeditor`

### Benutzerverwaltung
In der Seite `/register` könnte jeder einen Benutzer registriert und in der Seite `/login` einloggen.

### Rollenverwaltung
Administrator hat den Recht, Rolle an anderen Nutzer zu vergeben. Standardmäßig gibt es 2 Rollen: Admin und BusinessRuleAdmin
* Admin ist Administrator für das ganze Prototyp, der den Recht hast, Rollen und Business-Rule an anderen Nutzer zu vergeben. Darüber hinaus hat er den Recht auf die Verwaltung der Nutzer.

* BusinessRuleAdmin ist Administrator für die Geschäftsregelverwaltung. Mit der Rolle hat man den Recht, alle Geschäftsregelsätzen in dem System zuzugreifen und zu verarbeiten.

Die weitere Rolle können Sie als Entwickler noch in dem System hinzufügen.

### Geschäftsregelverwaltung
In dem System können Sie Geschäftsregeln erstellen, bearbeiten und überprüfen und absichern. 


## Benutzung der Anwendung

### Rollen  und Zugriffsrecht auf individuelle Geschäftsregelsatz vergeben
Nachdem Sie als Admin eingeloggt haben, dürfen Sie auf die Seite `/admindashboard` zugreifen. Hier könnten Sie die Rollen an anderen Nutzer und die Zugriffsrecht auf individuelle Geschäftsregelsatz vergeben.

### Geschäftsregelsatz bearbeiten

Nachdem Sie als Business-Rule-Admin eingeloggt haben, dürfen Sie die Seite `/ruledashboard` zugreifen.

Da können Sie die Geschäftsregelsatz exportieren bzw. importieren.

https://vinzdeveloper.github.io/json-rule-editor/docs/images/create-upload.png

![user role management](https://github.com/TaiLinhDu/node-rule-engine/Images/master/user_role_management.PNG?raw=true)

![user role management_2222](https://github.com/TaiLinhDu/node-rule-engine/Images/user_role_management.PNG?raw=true)

![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)


Zum Bearbeiten der Geschäftsregeln sollten Sie die einen Überblick auf das Webinterface haben [Json-Rule-Editor Dokumente](https://github.com/vinzdeveloper/json-rule-editor/blob/master/docs/manage-rules.md)