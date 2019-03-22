




function afficherClassement(nomLigue){
  //Variables
    let parent = document.getElementById('idAffichage');
    let tailleDuContenu = parent.childNodes.length;
    let teamBlock = document.getElementById('idTeam');
    let tailleTeam = teamBlock.childNodes.length;
    let featBlock = document.getElementById('idFeatures');
    let tailleFeatures = featBlock.childNodes.length;
    /*let leConteneur = document.getElementById('containerContenu');
    let tailleCont = leConteneur.childNodes.length; console.log(tailleCont);*/

  //Traitements
    //Supprimer les enfants du div de CONTENU
      for (let i=0 ; i<tailleDuContenu ; i++){
        parent.removeChild(parent.childNodes[0]);
      }

    //Supprimer le block feat
      for (let i=0 ; i<tailleFeatures ; i++){
        featBlock.removeChild(featBlock.childNodes[0]);
      }

    //Supprimer le block team
      for (let i=0 ; i<tailleTeam ; i++){
        teamBlock.removeChild(teamBlock.childNodes[0]);
      }

    //Supprimer le block conteneur
      if(document.getElementById('idAvant') != null){
        let rowBtn = document.getElementById('idApres').parentElement.parentElement; //On récupère la row qui contient les 2 btns
        let tailleRow = rowBtn.childNodes.length;

        for (let i=0 ; i<tailleRow ; i++){
          rowBtn.removeChild(rowBtn.childNodes[0]);
        }
      }


    //Creer la requete
        let requete = new XMLHttpRequest();

    //Effectuer le callback et afficher le classement
        requete.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              //Variables
                let nbClubs = requete.response.standings[0].table.length;

              //Creation de la table
                  let table = document.createElement("table");
                  table.setAttribute("class","table table-dark table-sm");

                  //Création de l'en tête du tableau
                  let thead = document.createElement("thead");

                    //Création de la 1er ligne du tableau
                      let premTabLigne = document.createElement("tr");

                      //Création des 1er céllules
                        let premCellule1 = document.createElement("td");
                        let premCellule2 = document.createElement("td");
                        let premCellule3 = document.createElement("td");
                        let premCellule4 = document.createElement("td");
                        let premCellule5 = document.createElement("td");

                      //Création du texte de chaqu'une des 1er cellules
                        let premTxt1 = document.createTextNode("Pos");
                        let premTxt2 = document.createTextNode("Nom");
                        let premTxt3 = document.createTextNode("MJ");
                        let premTxt4 = document.createTextNode("BM:BE");
                        let premTxt5 = document.createTextNode("Pts");

                      //Ajout du texte à chaque cellule
                        premCellule1.appendChild(premTxt1);
                        premCellule2.appendChild(premTxt2);
                        premCellule3.appendChild(premTxt3);
                        premCellule4.appendChild(premTxt4);
                        premCellule5.appendChild(premTxt5);

                      //Ajouter les 1ers cellules à la 1er ligne
                        premTabLigne.appendChild(premCellule1);
                        premTabLigne.appendChild(premCellule2);
                        premTabLigne.appendChild(premCellule3);
                        premTabLigne.appendChild(premCellule4);
                        premTabLigne.appendChild(premCellule5);

                      //Ajouter au tableau
                        thead.appendChild(premTabLigne)
                        table.appendChild(thead);

                      //Creation du corp du tableau
                        let tbody = document.createElement("tbody");

                    //BOUCLE PERMETTANT L'AFFICHAGE DU RESTE DU CLASSEMENT
                    for (let i=0 ; i < nbClubs ; i++){
                    //Création de la ligne du tableau
                      let tabLigne = document.createElement("tr");

                      //Création des céllules
                        let cellule1 = document.createElement("td");
                        let cellule2 = document.createElement("td");
                        let cellule3 = document.createElement("td");
                        let cellule4 = document.createElement("td");
                        let cellule5 = document.createElement("td");

                      //Création du texte de chaque cellule
                        let txt1 = document.createTextNode(requete.response.standings[0].table[i].position);
                        let txt2 = document.createTextNode("   " + requete.response.standings[0].table[i].team.name);
                        let txt3 = document.createTextNode(requete.response.standings[0].table[i].playedGames);
                        let txt4 = document.createTextNode(requete.response.standings[0].table[i].goalsFor + ":" + requete.response.standings[0].table[i].goalsAgainst);
                        let txt5 = document.createTextNode(requete.response.standings[0].table[i].points);

                      //Création de l'image du club
                        let image1 = document.createElement('img');
                        image1.setAttribute("src",requete.response.standings[0].table[i].team.crestUrl);
                        image1.setAttribute("height","25");
                        image1.setAttribute("width","25");

                      //Définir le texte (et l'image) de chaque cellule
                        cellule1.appendChild(txt1);
                        cellule2.appendChild(image1);
                        cellule2.appendChild(txt2);
                        cellule3.appendChild(txt3);
                        cellule4.appendChild(txt4);
                        cellule5.appendChild(txt5);

                      //Ajouter les cellules à la ligne
                        tabLigne.appendChild(cellule1);
                        tabLigne.appendChild(cellule2);
                        tabLigne.appendChild(cellule3);
                        tabLigne.appendChild(cellule4);
                        tabLigne.appendChild(cellule5);

                      //Ajouter la ligne au corp du tableau
                        tbody.appendChild(tabLigne);

                        //parent.appendChild(image1);

                      //Vérifier que chaque élément est bien récupéré
                        /*console.log(requete.response.standings[0].table[i].position);
                        console.log(requete.response.standings[0].table[i].team.name);
                        console.log(requete.response.standings[0].table[i].team.crestUrl);
                        console.log(requete.response.standings[0].table[i].playedGames);
                        console.log(requete.response.standings[0].table[i].goalsFor + ":" + requete.response.standings[0].table[i].goalsAgainst);
                        console.log(requete.response.standings[0].table[i].points);*/
                    }

                //Ajouter le corp du tableau au tableau
                  table.appendChild(tbody);

                //Ajouter la table dans la page
                  parent.appendChild(table);
          }
        });

    //Initialiser l'url ainsi que l'envoie de la demande de donnée à l'API
        let url = "https://api.football-data.org/v2/competitions/" + nomLigue + "/standings";
        requete.open("GET", url);
        requete.setRequestHeader("X-Auth-Token", "49cfbe4764bc42d5aa8748be05ab2ff1");
        //requete.setRequestHeader("X-Authenticated-Client", "anonymous");
        /*requete.setRequestHeader("Postman-Token", "a102f0f2-1799-4bc6-b5e6-14f3a7b7c8c4");*/
        requete.responseType = 'json';
        requete.send();

}

function journeeCourante(nomLigue){

    //Creer la requete
        let requete = new XMLHttpRequest();

    //Effectuer le callback et afficher le classement
        requete.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            return (requete.response.matches[0].season.currentMatchday);
          }
        });


      //Initialiser l'url ainsi que l'envoie de la demande de donnée à l'API
          let url = "https://api.football-data.org/v2/competitions/" + nomLigue + "/matches";
          requete.open("GET", url);
          requete.setRequestHeader("X-Auth-Token", "49cfbe4764bc42d5aa8748be05ab2ff1");
          requete.responseType = 'json';
          requete.send();
}


function afficherResultat(nomLigue,journeeMatch = null){
  //Variables
    let parent = document.getElementById('idAffichage');
    let taille = parent.childNodes.length;

    let teamBlock = document.getElementById('idTeam');
    let tailleTeam = teamBlock.childNodes.length;

    let featBlock = document.getElementById('idFeatures');
    let tailleFeatures = featBlock.childNodes.length;

    let leConteneur = document.getElementById('containerContenu');

  //Traitements

    //Suppression des éléments non utile pour l'affichage de la page
      //Supprimer les enfants
        for (let i=0 ; i<taille ; i++){
          parent.removeChild(parent.childNodes[0]);
        }

      //Supprimer le block feat
        for (let i=0 ; i<tailleFeatures ; i++){
          featBlock.removeChild(featBlock.childNodes[0]);
        }

      //Supprimer le block team
        for (let i=0 ; i<tailleTeam ; i++){
          teamBlock.removeChild(teamBlock.childNodes[0]);
        }

      //Supprimer les boutons précédent
        if(document.getElementById('idAvant') != null){
          let rowBtn = document.getElementById('idApres').parentElement.parentElement; //On récupère la row qui contient les 2 btns
          let tailleRow = rowBtn.childNodes.length;

          for (let i=0 ; i<tailleRow ; i++){
            rowBtn.removeChild(rowBtn.childNodes[0]);
          }
        }

    //AJout des boutons
      //Créer un row
        let row = document.createElement("div"); row.setAttribute("class","row");
        row.setAttribute("id","rowBoutons");

      //Créer troix colonnes
        let col1 = document.createElement("div"); col1.setAttribute("class","col-3");
        let col2 = document.createElement("div"); col2.setAttribute("class","col-6");
        let col3 = document.createElement("div"); col3.setAttribute("class","col-3"); col3.setAttribute("id","col-btn-right")

      //Créer 2 boutons
        let i1 = document.createElement("i");
        i1.setAttribute("class","fa fa-angle-left");
        //let txtBtn1 = document.createTextNode('<');
        let btn1 = document.createElement('button');
        btn1.setAttribute("id","idAvant");
        btn1.setAttribute("class","btn btn-primary");/*btn1.appendChild(txtBtn1);*/ btn1.appendChild(i1);

        let i2 = document.createElement("i");
        i2.setAttribute("class","fa fa-angle-right");
        //let txtBtn2 = document.createTextNode('>');
        let btn2 = document.createElement('button');
        btn2.setAttribute("id","idApres");btn2.setAttribute("class","btn btn-primary");/*btn2.appendChild(txtBtn2);*/btn2.appendChild(i2);

      //Créer la liste déroulante
        let select = document.createElement("select");select.setAttribute("class","custom-select");select.setAttribute("onchange","afficherResultat(\"" + nomLigue + "\", value)");



      //Imbrication des élements créé
        col1.appendChild(btn1);
        col2.appendChild(select);
        col3.appendChild(btn2);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        leConteneur.insertBefore(row,leConteneur.childNodes[0]); //insertion du row qui contient les boutons avant le row qui contient les résultats

    //Creer la requete
        let requete1 = new XMLHttpRequest();

    //Effectuer le 1er callback pour récupéré la journée courrante
        requete1.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {

            if(journeeMatch == null){
              journeeMatch = requete1.response.season.currentMatchday; /*console.log("Nb journ dans la " + nomLigue + " " + journeeMatch);*/
            }

            //Définir la value des boutons
              btn1.setAttribute("onclick","afficherResultat(\"" + nomLigue + "\", " + (journeeMatch-1) + ")");
              btn2.setAttribute("onclick","afficherResultat(\"" + nomLigue + "\", " + (journeeMatch+1) + ")");

            //Ajout de toutes les journées dans liste déroulante
              let nbJournee = (requete1.response.standings[0].table.length - 1) * 2; // nbJournee = (nbEquipes-1) * 2

              for(let i=1 ; i <= nbJournee ; i++){
                let txtJournee = document.createTextNode("Journée " + i);
                let option = document.createElement("option");
                option.setAttribute("value",i);
                option.appendChild(txtJournee);

                //Vérifier que la ième journée à la journéeCOurante
                if(i == journeeMatch){
                  option.setAttribute("selected","selected");
                }
                select.appendChild(option);
              }

            //DEUXIEME REQUETE POUR AFFICHER LE CLASSEMENT

            //Creer la requete
            let requete2 = new XMLHttpRequest();


          //Effectuer le 2 eme callback et afficher le classement
              requete2.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    //Variables
                      let nbMatchs = requete2.response.count;
                      /*console.log("Nb match" + nbMatchs);
                      console.log("Local" + requete2.response.matches[0].homeTeam.name);
                      console.log("Local" + requete2.response.matches[0].awayTeam.name);*/

                    //Creation de la table
                        let table = document.createElement("table");
                        table.setAttribute("class","table table-dark table-sm");

                        //Création de l'en tête du tableau
                        let thead = document.createElement("thead");

                        //Création de la 1er ligne du tableau
                          let premTabLigne = document.createElement("tr");

                          //Création des 1er céllules avec ID
                            let premCellule1 = document.createElement("td");
                            let premCellule2 = document.createElement("td");
                            let premCellule3 = document.createElement("td");

                          //Création du texte de chaqu'une des 1er cellules
                            let premTxt1 = document.createTextNode("Equipe à domicile");
                            let premTxt2 = document.createTextNode("Score");
                            let premTxt3 = document.createTextNode("Equipe à l'exterieur");



                          //Ajout du texte à chaque cellule
                            premCellule1.appendChild(premTxt1);
                            premCellule2.appendChild(premTxt2);
                            premCellule3.appendChild(premTxt3);

                          //Ajouter les 1ers cellules à la 1er ligne
                            premTabLigne.appendChild(premCellule1);
                            premTabLigne.appendChild(premCellule2);
                            premTabLigne.appendChild(premCellule3);

                          //Ajout à l'en tête du tableau
                            thead.appendChild(premTabLigne);
                          //Ajouter au tableau
                            table.appendChild(thead);

                        //Creation du corp du tableau
                          let tbody = document.createElement("tbody");

                        //BOUCLE PERMETTANT L'AFFICHAGE DU RESTE DU CLASSEMENT
                        for (let i=0 ; i < nbMatchs ; i++){
                        //Création de la ligne du tableau
                          let tabLigne = document.createElement("tr");

                          //Création des céllules
                            let cellule1 = document.createElement("td");
                            let cellule2 = document.createElement("td");
                            let cellule3 = document.createElement("td");

                            //console.log(requete2.response.matches[i].homeTeam.name);

                           //Création du texte de chaque cellule
                              let resultatMatch = requete2.response.matches[i].score.winner; console.log("winner : " + resultatMatch);
                              let statuMatch = requete2.response.matches[i].status; console.log("Statut : " + statuMatch);
                              let dateMatch = requete2.response.matches[i].utcDate.split("T")[0].split("-")[1] + "/" + requete2.response.matches[i].utcDate.split("T")[0].split("-")[2];
                              let heureMatch = requete2.response.matches[i].utcDate.split("T")[1].split(":")[0] + "h" + requete2.response.matches[i].utcDate.split("T")[1].split(":")[1];
                              let equipeLocal = document.createTextNode(requete2.response.matches[i].homeTeam.name);
                              let scoreMatch = document.createTextNode(requete2.response.matches[i].score.fullTime.homeTeam + " - " + requete2.response.matches[i].score.fullTime.awayTeam);
                              let equipeExterieur = document.createTextNode(requete2.response.matches[i].awayTeam.name);


                          //Définir le texte (et l'image) de chaque cellule
                            cellule1.appendChild(equipeLocal);

                            //Vérifier l'etat du match
                              if(statuMatch == "SCHEDULED" || statuMatch == "FINISHED"){

                                if(resultatMatch != null){
                                  cellule2.appendChild(scoreMatch);
                                }
                                else{
                                  let txtDateMatch = document.createTextNode(dateMatch + " - " + heureMatch);
                                  cellule2.appendChild(txtDateMatch);
                                }
                              }
                              else {
                                let matchReporte = document.createTextNode(statuMatch);
                                cellule2.appendChild(matchReporte);
                              }

                            cellule3.appendChild(equipeExterieur);

                          //Ajouter les cellules à la ligne
                            tabLigne.appendChild(cellule1);
                            tabLigne.appendChild(cellule2);
                            tabLigne.appendChild(cellule3);

                          //Ajouter la ligne au tableau
                            tbody.appendChild(tabLigne);

                        }

                      //Ajouter le corp du tableau au tableau
                        table.appendChild(tbody);

                      //Ajouter la table dans la page
                        parent.appendChild(table);
                }
              });

          //Demander le classement de l'API
              let url2 = "https://api.football-data.org/v2/competitions/" + nomLigue + "/matches?matchday=" + journeeMatch;
              requete2.open("GET", url2);
              requete2.setRequestHeader("X-Auth-Token", "49cfbe4764bc42d5aa8748be05ab2ff1");
              requete2.responseType = 'json';
              requete2.send();
          }
        });


      //Demander la journée courrante à l'API
          let url1 = "https://api.football-data.org/v2/competitions/" + nomLigue + "/standings";
          requete1.open("GET", url1);
          requete1.setRequestHeader("X-Auth-Token", "49cfbe4764bc42d5aa8748be05ab2ff1");
          requete1.responseType = 'json';
          requete1.send();


}


function afficherActu(){
  //Variables
    let parent = document.getElementById('idAffichage');
    let tailleDuContenu = parent.childNodes.length;
    let teamBlock = document.getElementById('idTeam');
    let tailleTeam = teamBlock.childNodes.length;
    let featBlock = document.getElementById('idFeatures');
    let tailleFeatures = featBlock.childNodes.length;
    /*let leConteneur = document.getElementById('containerContenu');
    let tailleCont = leConteneur.childNodes.length; console.log(tailleCont);*/

  //Traitements
    //Supprimer les enfants du div de CONTENU
      for (let i=0 ; i<tailleDuContenu ; i++){
        parent.removeChild(parent.childNodes[0]);
      }

      //Supprimer le block feat
      for (let i=0 ; i<tailleFeatures ; i++){
        featBlock.removeChild(featBlock.childNodes[0]);
      }

    //Supprimer le block team
      for (let i=0 ; i<tailleTeam ; i++){
        teamBlock.removeChild(teamBlock.childNodes[0]);
      }

    //Supprimer le block conteneur
      if(document.getElementById('idAvant') != null){
        let rowBtn = document.getElementById('idApres').parentElement.parentElement; //On récupère la row qui contient les 2 btns
        let tailleRow = rowBtn.childNodes.length;

        for (let i=0 ; i<tailleRow ; i++){
          rowBtn.removeChild(rowBtn.childNodes[0]);
        }
      }


    //Creer la requete
        let requete = new XMLHttpRequest();

    //Effectuer le callback et afficher le classement
        requete.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              //Variables
                let nbArticle = requete.response.totalResults; console.log(nbArticle);

              //Creation du container
                  let containerCarte = document.createElement("div");
                  containerCarte.setAttribute("class","container-fluid");

                  //Création ligne
                    let ligneCarte = document.createElement("div");
                    ligneCarte.setAttribute("class","row");

                  let nbCartes = 0;

                    //BOUCLE PERMETTANT L'AFFICHAGE DES ARTICLES
                    for (let i=0 ; i < 20 ; i++){
                      //Création de la ligne
                      console.log(requete.response.articles[i].title);
                      if(requete.response.articles[i].title.split(' - ')[0] == "Foot"){

                        //Création de la colone
                          let colCarte = document.createElement("div");
                          colCarte.setAttribute("class","col-md-4 col-sm-6 col-xs-12");

                        //Création de la carte
                          let carte = document.createElement("div");
                          carte.setAttribute("class","card mb-3");

                        //Création titre + ajout dans la carte
                          //Suprésion des carractères inatendu comme "&#039;"   =  '
                            let leTitreTabErreur = requete.response.articles[i].title.split(' - ');
                            let tailleTitreErreur = leTitreTabErreur.length;

                            let leTitreTab = leTitreTabErreur[tailleTitreErreur-1].split('&#039;');
                            let leTitre = leTitreTab[0];
                            let laTailleTitre = leTitreTab.length;
                            for(let j=1 ; j < laTailleTitre ; j++){
                              leTitre += "'" + leTitreTab[j];
                            }

                          //Création et ajout du texte du titre
                            let txtTitre = document.createTextNode(leTitre);
                            let titreCarte = document.createElement("h5");
                            titreCarte.setAttribute("class","card-title");
                            titreCarte.setAttribute("style","font-size: 15px;");
                            titreCarte.appendChild(txtTitre);

                          //Ajout du titre à la carte
                            carte.appendChild(titreCarte);

                        //Création et ajout de l'image
                          //Création de l'image de la carte
                            let imgCarte = document.createElement("img");
                            imgCarte.setAttribute("style","height: 100%; width: 100%; display: block;");
                            imgCarte.setAttribute("src",requete.response.articles[i].urlToImage);

                          //Ajout de l'image à la carte
                            carte.appendChild(imgCarte);

                        //Création et ajout du descriptif
                          //Création emplacement descriptif de la carte
                            let emplacementDescriptif = document.createElement("div");
                            emplacementDescriptif.setAttribute("class","card-body");

                          //Création du descriptif de la carte
                            let txtDescriptif = document.createTextNode(requete.response.articles[i].description);
                            let descriptifCarte = document.createElement("p");
                            descriptifCarte.appendChild(txtDescriptif);
                            descriptifCarte.setAttribute("class","card-text");
                            descriptifCarte.setAttribute("style","font-size: 12px;");


                          //Ajout descriptif dans l'emplacement
                            emplacementDescriptif.appendChild(descriptifCarte);

                          //Ajout de l'emplacement dans la carte
                            carte.appendChild(emplacementDescriptif);


                        //Ajout des éléments
                          colCarte.appendChild(carte);
                          ligneCarte.appendChild(colCarte);
                          containerCarte.appendChild(ligneCarte);
                      }

                    }

                //Ajouter le conteneur de carte dans la page
                  parent.appendChild(containerCarte);
          }
        });

    //Initialiser l'url ainsi que l'envoie de la demande de donnée à l'API
        let url = "https://newsapi.org/v2/everything?sources=lequipe&apiKey=a1b822da6e074842bb4cd2063a7a03f7";
        requete.open("GET", url);
        //requete.setRequestHeader("X-Auth-Token", "49cfbe4764bc42d5aa8748be05ab2ff1");
        //requete.setRequestHeader("X-Authenticated-Client", "anonymous");
        /*requete.setRequestHeader("Postman-Token", "a102f0f2-1799-4bc6-b5e6-14f3a7b7c8c4");*/
        requete.responseType = 'json';
        requete.send();

}

function journeeCourante(nomLigue){

    //Creer la requete
        let requete = new XMLHttpRequest();

    //Effectuer le callback et afficher le classement
        requete.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            return (requete.response.matches[0].season.currentMatchday);
          }
        });


      //Initialiser l'url ainsi que l'envoie de la demande de donnée à l'API
          let url = "https://api.football-data.org/v2/competitions/" + nomLigue + "/matches";
          requete.open("GET", url);
          requete.setRequestHeader("X-Auth-Token", "49cfbe4764bc42d5aa8748be05ab2ff1");
          requete.responseType = 'json';
          requete.send();
}
