# Prototyp zur Verwaltung der Geschäftsregeln
Die Anwendung ermöglicht es Ihnen, Geschäftsregeln zu verwalten (Wenn ...,Dann ...). Die Anwendung ermöglicht es Ihnen als Administrator, anderen Benutzern Rollen oder Zugriffsrechte auf Geschäftsregelsätze zuzuweisen. Die Benutzer mit den Zugriffsrechten sind berechtigt, die Geschäftsregeln zu lesen und zu bearbeiten. 

Das Projekt bietet eine Anwendung mit Benutzerverwaltung, Rollenverwaltung, Geschäftsregelverwaltung.

* Benutzerverwaltung ermöglicht die Authentifizierung von Benutzern
* Rollenverwaltung ermöglicht den rollenbasierten Zugriff auf Ressourcen
* Die Geschäftsregelverwaltung bietet die Möglichkeit, Geschäftsregelsätze zu erstellen und zu bearbeiten. Für die Speicherung der Geschäftsregelsätze steht hier ein Repository zur Verfügung.



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
Auf der Seite `/register` konnte sich jeder als Benutzer registrieren und auf der Seite `/login` anmelden.

### Rollenverwaltung
Der Administrator hat das Recht, anderen Benutzern Rollen zuzuweisen. Standardmäßig gibt es 2 Rollen: Admin und BusinessRuleAdmin
* Admin ist der Administrator für den gesamten Prototyp, der das Recht hat, anderen Benutzern Rollen und Geschäftsregeln zuzuweisen. Darüber hinaus hat er das Recht, die Benutzer zu verwalten.

* BusinessRuleAdmin ist der Administrator für die Verwaltung der Geschäftsregeln. Mit dieser Rolle haben Sie das Recht, auf alle Geschäftsregelsätze im System zuzugreifen und diese zu bearbeiten.

Als Entwickler können Sie dem System eine weitere Rolle hinzufügen.

### Geschäftsregelverwaltung
Im System können Sie Geschäftsregeln erstellen, bearbeiten, überprüfen und speichern.


## Benutzung der Anwendung

### Rollen und Zugriffsrecht auf individuelle Geschäftsregelsatz vergeben
Nachdem Sie sich als Administrator angemeldet haben, können Sie auf die Seite `/admindashboard` zugreifen. Hier können Sie die Rollen anderen Benutzern zuweisen und die Zugriffsrechte für einzelne Geschäftsregeln festlegen.

***Rollen vergeben***
Als Administrator können Sie jedem Benutzer eine bis mehrere Rollen zuweisen. Ein Benutzer kann eine bis mehrere Rollen behalten.
![user role management](https://github.com/TaiLinhDu/node-rule-engine/blob/main/Docs/Images/user_role_management.PNG)

***Zugriffsrecht auf individuelle Geschäftsregelsatz vergeben***
Als Administrator können Sie auch jeder Person Zugriffsrechte auf einzelne Geschäftsregelsätze zuweisen. Der Benutzer darf nur den Geschäftsregelsatz auf der Seite `/ruledashboard` bearbeiten.
![individual_rule_acess_right](https://github.com/TaiLinhDu/node-rule-engine/blob/main/Docs/Images/individual_rule_acess_right.PNG)

### Geschäftsregelsatz bearbeiten

Wenn Ihnen die Rolle "Business-Rule-Admin" oder ein Zugriffsrecht auf einen einzelnen Geschäftsregelsatz zugewiesen wurde, können Sie auf die Seite `/ruledashboard` zugreifen. Dort können Sie die Geschäftsregelsätze exportieren oder importieren. Der Zweck der Seite besteht darin, die Geschäftsregelsätze zu bearbeiten. Aus diesem Grund wird jeder Schritt des Prozesses dargestellt.

![rule_dashboard](https://github.com/TaiLinhDu/node-rule-engine/blob/main/Docs/Images/rule_dashboard.PNG)

***Schritt1***
Geschäftsregelsatz auswählen und herunterladen (Export)

***Schritt2***
Gehen Sie zur Oberfläche für die Bearbeitung des Geschäftsregelsatzes

Zum Bearbeiten der Geschäftsregeln sollten Sie die einen Überblick auf das Webinterface haben [Json-Rule-Editor Dokumente](https://github.com/vinzdeveloper/json-rule-editor/blob/master/docs/manage-rules.md)

***Schritt3***
Nach der Bearbeitung haben Sie einen neuen Geschäftsregelsatz in Form einer JSON-Datei erstellt. Sie sollten das Geschäftsregelwerk in dem Schritt auswählen, in dem die Aktualisierung stattfindet.

***Schritt4***
Sie laden den bearbeiteten Satz von Geschäftsregeln hoch (Import).