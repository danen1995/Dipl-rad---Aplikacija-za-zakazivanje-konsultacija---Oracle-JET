define({"oj-message":{fatal:"Irreversibile",error:"Errore",warning:"Avvertenza",info:"Informazioni",confirmation:"Conferma","compact-type-summary":"{0}: {1}"},"oj-converter":{summary:"Il valore non è nel formato previsto.",detail:"Immettere un valore nel formato previsto.","plural-separator":", ",hint:{summary:"Esempio: {exampleValue}",detail:"Immettere un valore nello stesso formato di questo esempio: '{exampleValue}'.","detail-plural":"Immettere un valore nello stesso formato di questi esempi: '{exampleValue}'."},optionHint:{detail:"Un valore accettato per l'opzione '{propertyName}' è '{propertyValueValid}'.","detail-plural":"Valori accettati per l'opzione '{propertyName}' sono '{propertyValueValid}'."},optionTypesMismatch:{summary:"Per l'opzione '{requiredPropertyName}' è necessario specificare un valore quando l'opzione '{propertyName}' è impostata su '{propertyValue}'."},optionTypeInvalid:{summary:"Per l'opzione '{propertyName}' non è stato specificato un valore del tipo previsto."},optionOutOfRange:{summary:"Il valore {propertyValue} non è compreso nell'intervallo per l'opzione '{propertyName}',"},optionValueInvalid:{summary:"Per l'opzione '{propertyName}' è stato specificato un valore '{propertyValue}' non valido."},number:{decimalFormatMismatch:{summary:"Il valore '{value}' non è nel formato numero previsto."},shortLongUnsupportedParse:{summary:"'short' e 'long' non sono supportati per l'analisi del convertitore.",detail:"Modificare il componente in readonly. I campi readonly non richiamano la funzione parse del convertitore."},currencyFormatMismatch:{summary:"Il valore '{value}' non è nel formato valuta previsto."},percentFormatMismatch:{summary:"Il valore '{value}' non è nel formato percentuale previsto."}},datetime:{datetimeOutOfRange:{summary:"Il valore '{value}' non è compreso nell'intervallo per la proprietà '{propertyName}'.",detail:"Immettere un valore compreso tra '{minValue}' e '{maxValue}'.",hour:"ora",minute:"minuto",second:"secondo",millisec:"millisecondo",month:"mese",day:"giorno",year:"anno","month name":"nome mese",weekday:"giorno feriale"},dateFormatMismatch:{summary:"Il valore '{value}' non è nel formato data previsto."},invalidTimeZoneID:{summary:"Fornito un ID fuso orario {timeZoneID} non valido."},nonExistingTime:{summary:"L'ora di input non esiste poiché ricade durante la transizione all'ora legale."},missingTimeZoneData:{summary:"Dati TimeZone mancanti. Richiamare i dati 'ojs/ojtimezonedata' richiesti in modo da poter caricare i dati TimeZone."},timeFormatMismatch:{summary:"Il valore '{value}' non è nel formato ora previsto."},datetimeFormatMismatch:{summary:"Il valore '{value}' non è nel formato data e ora previsto."},dateToWeekdayMismatch:{summary:"Il giorno '{date}' non è un '{weekday}'.",detail:"Immettere un giorno della settimana che corrisponde alla data."},invalidISOString:{summary:"La '{isoStr}' fornita non è una stringa ISO 8601 valida.",detail:"Fornire una stringa ISO 8601 valida."}}},"oj-validator":{length:{hint:{min:"Immettere {min} caratteri o più.",max:"Immettere {max} caratteri o meno.",inRange:"Immettere {min} caratteri o più, fino a un massimo di {max}.",exact:"Immettere {length} caratteri."},messageDetail:{tooShort:"Immettere {min} caratteri o più, non di meno.",tooLong:"Immettere {max} caratteri o meno, non di più."},messageSummary:{tooShort:"Caratteri insufficienti.",tooLong:"Troppi caratteri."}},range:{number:{hint:{min:"Immettere un numero maggiore o uguale a {min}.",max:"Immettere un numero minore o uguale a {max}.",inRange:"Immettere un numero compreso tra {min} e {max}.",exact:"Immettere il numero {num}."},messageDetail:{rangeUnderflow:"Il numero deve essere maggiore o uguale a {min}.",rangeOverflow:"Il numero deve essere minore o uguale a {max}.",exact:"Il numero deve essere {num}."},messageSummary:{rangeUnderflow:"Il numero è troppo basso.",rangeOverflow:"Il numero è troppo alto."}},datetime:{hint:{min:"Immettere un valore di data/ora uguale o successivo a {min}.",max:"Immettere un valore data/ora uguale o precedente a {max}.",inRange:"Immettere un valore di data/ora compreso tra i valori {min} e {max}."},messageDetail:{rangeUnderflow:"Il valore di data/ora deve essere uguale o successivo a {min}.",rangeOverflow:"Il valore di data/ora deve essere uguale o precedente a {max}."},messageSummary:{rangeUnderflow:"Valore di data/ora precedente alla data e all'ora minime.",rangeOverflow:"Valore di data/ora successivo alla data e all'ora massime."}},date:{hint:{min:"Immettere la data del {min} o una data posteriore.",max:"Immettere la data del {max} o una data anteriore.",inRange:"Immettere una data tra il {min} e il {max}."},messageDetail:{rangeUnderflow:"Il valore di data deve essere uguale o successivo a {min}.",rangeOverflow:"Il valore di data deve essere uguale o precedente a {max}."},messageSummary:{rangeUnderflow:"La data è precedente alla data minima.",rangeOverflow:"La data è successiva alla data massima."}},time:{hint:{min:"Immettere un'ora {min} o un'ora posteriore.",max:"Immettere un'ora {max} o un'ora anteriore.",inRange:"Immettere un'ora tra il {min} e il {max}."},messageDetail:{rangeUnderflow:"Il valore dell'ora deve essere uguale o successivo a {min}.",rangeOverflow:"Il valore dell'ora deve essere uguale o precedente a {max}."},messageSummary:{rangeUnderflow:"Valore dell'ora precedente all'ora minima.",rangeOverflow:"Valore dell'ora successivo all'ora massima."}}},restriction:{date:{messageSummary:"Data {value} di una voce disabilitata.",messageDetail:"La data {value} non deve essere di una voce disabilitata."}},regExp:{summary:"Formato errato.",detail:"Il valore '{value}' deve corrispondere a questo pattern: '{pattern}'."},required:{summary:"Valore obbligatorio.",detail:"È necessario immettere un valore."}},"oj-ojInputDate":{done:"Operazione completata",cancel:"Annulla",prevText:"Precedente",nextText:"Successivo",currentText:"Oggi",weekHeader:"Sett.",tooltipCalendar:"Seleziona data.",tooltipCalendarTime:"Seleziona data/ora.",tooltipCalendarDisabled:"Seleziona data disabilitato.",tooltipCalendarTimeDisabled:"Seleziona data/ora disabilitato.",picker:"Selettore",weekText:"Settimana",datePicker:"Selettore data",inputHelp:"Premere il tasto freccia GIÙ o il tasto freccia SU per accedere al calendario.",inputHelpBoth:"Premere il tasto freccia GIÙ o il tasto freccia SU per accedere al calendario e Maiusc + tasto freccia GIÙ o tasto freccia SU per accedere all'elenco a discesa dell'ora.",dateTimeRange:{hint:{min:"",max:"",inRange:""},messageDetail:{rangeUnderflow:"",rangeOverflow:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}},dateRestriction:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojInputTime":{cancelText:"Annulla",okText:"OK",currentTimeText:"Adesso",hourWheelLabel:"Ora",minuteWheelLabel:"Minuto",ampmWheelLabel:"AMPM",tooltipTime:"Seleziona ora.",tooltipTimeDisabled:"Seleziona ora disabilitato.",inputHelp:"Premere il tasto freccia GIÙ o il tasto freccia SU per accedere all'elenco a discesa dell'ora.",dateTimeRange:{hint:{min:"",max:"",inRange:""},messageDetail:{rangeUnderflow:"",rangeOverflow:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}}},"oj-inputBase":{required:{hint:"",messageSummary:"",messageDetail:""},regexp:{messageSummary:"",messageDetail:""}},"oj-ojInputPassword":{regexp:{messageDetail:"Il valore deve corrispondere a questo pattern: '{pattern}'."}},"oj-ojFilmStrip":{labelAccFilmStrip:"Visualizzazione pagina {pageIndex} di {pageCount}",labelAccArrowNextPage:"Selezionare Successivo per visualizzare la pagina successiva",labelAccArrowPreviousPage:"Selezionare Precedente per visualizzare la pagina precedente",tipArrowNextPage:"Successivo",tipArrowPreviousPage:"Precedente"},"oj-ojDataGrid":{accessibleSortAscending:"{id} ordinato in ordine crescente",accessibleSortDescending:"{id} ordinato in ordine decrescente",accessibleActionableMode:"Accedere a modalità con interazione.",accessibleNavigationMode:"Accedere a modalità navigazione e premere F2 per accedere a modalità modifica o con interazione.",accessibleEditableMode:"Accedere a modalità modifica e premere escape per navigare fuori dalla griglia dati.",accessibleSummaryExact:"Questa è una griglia dati con {rownum} righe e {colnum} colonne",accessibleSummaryEstimate:"Questa è una griglia dati con numero di righe e colonne sconosciuto",accessibleSummaryExpanded:"Attualmente sono presenti {num} righe espanse",accessibleRowExpanded:"Riga espansa",accessibleRowCollapsed:"Riga compressa",accessibleRowSelected:"Riga {row} selezionata",accessibleColumnSelected:"Colonna {column} selezionata",accessibleStateSelected:"selezionato",accessibleMultiCellSelected:"{num} celle selezionate",accessibleColumnSpanContext:"{extent} largo",accessibleRowSpanContext:"{extent} alto",accessibleRowContext:"Riga {index}",accessibleColumnContext:"Colonna {index}",accessibleRowHeaderContext:"Intestazione riga {index}",accessibleColumnHeaderContext:"Intestazione colonna {index}",accessibleRowEndHeaderContext:"Intestazione fine riga {index}",accessibleColumnEndHeaderContext:"Intestazione fine colonna {index}",accessibleLevelContext:"Livello {level}",accessibleRangeSelectModeOn:"Modalità attiva - Aggiungi intervallo di celle selezionate.",accessibleRangeSelectModeOff:"Modalità non attiva - Aggiungi intervallo di celle selezionate.",accessibleFirstRow:"È stata raggiunta la prima riga.",accessibleLastRow:"È stata raggiunta l'ultima riga.",accessibleFirstColumn:"È stata raggiunta la prima colonna",accessibleLastColumn:"È stata raggiunta l'ultima colonna.",accessibleSelectionAffordanceTop:"Gestione prime selezioni.",accessibleSelectionAffordanceBottom:"Gestione ultime selezioni.",msgFetchingData:"Recupero dati in corso...",msgNoData:"Nessun elemento da visualizzare.",labelResize:"Ridimensiona",labelResizeWidth:"Ridimensiona larghezza",labelResizeHeight:"Ridimensiona altezza",labelSortRow:"Ordina riga",labelSortRowAsc:"Ordina riga con ordinamento crescente",labelSortRowDsc:"Ordina riga con ordinamento decrescente",labelSortCol:"Ordina colonna",labelSortColAsc:"Ordina colonna con ordinamento crescente",labelSortColDsc:"Ordina colonna con ordinamento decrescente",labelCut:"Taglia",labelPaste:"Incolla",labelEnableNonContiguous:"Abilita la selezione di righe non contigue",labelDisableNonContiguous:"Disabilita la selezione di righe non contigue",labelResizeDialogSubmit:"OK"},"oj-ojRowExpander":{accessibleLevelDescription:"Livello {level}",accessibleRowDescription:"Livello {level}, Riga {num} di {total}",accessibleRowExpanded:"Riga espansa",accessibleRowCollapsed:"Riga compressa",accessibleStateExpanded:"espanso",accessibleStateCollapsed:"compresso"},"oj-ojListView":{msgFetchingData:"Recupero dati in corso...",msgNoData:"Nessun elemento da visualizzare.",indexerCharacters:"A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z",accessibleReorderTouchInstructionText:"Toccare due volte e tenere premuto. Attendere il segnale sonoro e riordinare.",accessibleReorderBeforeItem:"Prima di {item}",accessibleReorderAfterItem:"Dopo {item}",accessibleReorderInsideItem:"In {item}",accessibleNavigateSkipItems:"{numSkip} elementi saltati",labelCut:"Taglia",labelCopy:"Copia",labelPaste:"Incolla",labelPasteBefore:"Incolla prima",labelPasteAfter:"Incolla dopo"},"oj-_ojLabel":{tooltipHelp:"Guida in linea",tooltipRequired:"Obbligatorio"},"oj-ojLabel":{tooltipHelp:"Guida in linea",tooltipRequired:"Obbligatorio"},"oj-ojInputNumber":{required:{hint:"",messageSummary:"",messageDetail:""},numberRange:{hint:{min:"",max:"",inRange:"",exact:""},messageDetail:{rangeUnderflow:"",rangeOverflow:"",exact:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}},tooltipDecrement:"Diminuisce",tooltipIncrement:"Aumenta"},"oj-ojTable":{labelAccSelectionAffordanceTop:"Gestione prime selezioni",labelAccSelectionAffordanceBottom:"Gestione ultime selezioni",labelEnableNonContiguousSelection:"Abilita la selezione di righe non contigue",labelDisableNonContiguousSelection:"Disabilita la selezione di righe non contigue",labelResize:"Ridimensiona",labelResizePopupSubmit:"OK",labelResizePopupSpinner:"Ridimensiona colonna",labelSelectRow:"Seleziona riga",labelEditRow:"Modifica riga",labelSelectAndEditRow:"Selezionare e modificare riga",labelSelectColumn:"Seleziona colonna",labelSort:"Ordina",labelSortAsc:"Ordinamento crescente",labelSortDsc:"Ordinamento decrescente",msgFetchingData:"Recupero dati in corso...",msgNoData:"Nessun dato da visualizzare.",msgInitializing:"Inizializzazione in corso...",msgColumnResizeWidthValidation:"Il valore della larghezza deve essere un numero intero.",msgScrollPolicyMaxCountSummary:"Superato numero massimo righe per scorrimento tabella.",msgScrollPolicyMaxCountDetail:"Ricaricare un data set più piccolo.",msgStatusSortAscending:"{0} ordinato in ordine crescente.",msgStatusSortDescending:"{0} ordinato in ordine decrescente."},"oj-ojTabs":{labelCut:"Taglia",labelPasteBefore:"Incolla prima",labelPasteAfter:"Incolla dopo",labelRemove:"Rimuovi",labelReorder:"Riordina",removeCueText:"Rimovibile"},"oj-ojCheckboxset":{required:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojRadioset":{required:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojSelect":{required:{hint:"",messageSummary:"",messageDetail:""},searchField:"Campo di ricerca",noMatchesFound:"Nessuna corrispondenza trovata",oneMatchesFound:"Una corrispondenza trovata",moreMatchesFound:"{num} corrispondenze trovate",filterFurther:"Sono disponibili altri risultati; filtrare ulteriormente."},"oj-ojSwitch":{SwitchON:"Attivo",SwitchOFF:"Non attivo"},"oj-ojCombobox":{required:{hint:"",messageSummary:"",messageDetail:""},noMatchesFound:"Nessuna corrispondenza trovata",filterFurther:"Sono disponibili altri risultati; filtrare ulteriormente."},"oj-ojInputSearch":{required:{hint:"",messageSummary:"",messageDetail:""},noMatchesFound:"Nessuna corrispondenza trovata",oneMatchesFound:"Una corrispondenza trovata",moreMatchesFound:"{num} corrispondenze trovate"},"oj-ojTree":{stateLoading:"Caricamento in corso...",labelNewNode:"Nuovo nodo",labelMultiSelection:"Selezione multipla",labelEdit:"Modifica",labelCreate:"Crea",labelCut:"Taglia",labelCopy:"Copia",labelPaste:"Incolla",labelPasteAfter:"Incolla dopo",labelPasteBefore:"Incolla prima",labelRemove:"Rimuovi",labelRename:"Rinomina",labelNoData:"Nessun dato"},"oj-ojPagingControl":{labelAccPaging:"Impaginazione",labelAccNavFirstPage:"Prima pagina",labelAccNavLastPage:"Ultima pagina",labelAccNavNextPage:"Pagina successiva",labelAccNavPreviousPage:"Pagina precedente",labelAccNavPage:"Pagina",labelLoadMore:"Mostra altri...",labelLoadMoreMaxRows:"Raggiunto il limite massimo di {maxRows} righe",labelNavInputPage:"Pagina",labelNavInputPageMax:"di {pageMax}",msgItemRangeCurrent:"{pageFrom}-{pageTo}",msgItemRangeCurrentSingle:"{pageFrom}",msgItemRangeOf:"di",msgItemRangeOfAtLeast:"di almeno",msgItemRangeOfApprox:"di circa",msgItemRangeItems:"elementi",tipNavInputPage:"Vai a pagina",tipNavPageLink:"Vai a pagina {pageNum}",tipNavNextPage:"Successiva",tipNavPreviousPage:"Precedente",tipNavFirstPage:"Prima",tipNavLastPage:"Ultima",pageInvalid:{summary:"Il valore pagina immesso non è valido.",detail:"Immettere un valore maggiore di 0."},maxPageLinksInvalid:{summary:"Il valore di maxPageLinks non è valido.",detail:"Immettere un valore maggiore di 4."}},"oj-ojMasonryLayout":{labelCut:"Taglia",labelPasteBefore:"Incolla prima",labelPasteAfter:"Incolla dopo"},"oj-panel":{labelAccButtonExpand:"Espandi",labelAccButtonCollapse:"Comprimi",labelAccButtonRemove:"Rimuovi"},"oj-ojChart":{labelDefaultGroupName:"Gruppo {0}",labelSeries:"Serie",labelGroup:"Gruppo",labelDate:"Data",labelValue:"Valore",labelTargetValue:"Destinazione",labelX:"X",labelY:"Y",labelZ:"Z",labelPercentage:"Percentuale",labelLow:"Basso",labelHigh:"Alto",labelOpen:"Aperto",labelClose:"Chiuso",labelVolume:"Volume",labelQ1:"Q1",labelQ2:"Q2",labelQ3:"Q3",labelMin:"Min",labelMax:"Max",labelOther:"Altri",tooltipPan:"Panoramica",tooltipSelect:"Selezione cornice",tooltipZoom:"Zoom cornice",componentName:"Grafico"},"oj-dvtBaseGauge":{componentName:"Misuratore"},"oj-ojDiagram":{promotedLink:"{0} collegamento",promotedLinks:"{0} collegamenti",promotedLinkAriaDesc:"Indiretto",componentName:"Diagramma"},"oj-ojGantt":{componentName:"Gantt",accessibleDurationDays:"{0} giorni",accessibleDurationHours:"{0} ore",accessibleTaskInfo:"L'ora di inizio è {0}, l'ora di fine è {1}, la durata è {2}",accessibleMilestoneInfo:"L'ora è {0}",accessibleRowInfo:"Riga {0}",accessibleTaskTypeMilestone:"Milestone",accessibleTaskTypeSummary:"Riepilogo",accessiblePredecessorInfo:"{0} predecessori",accessibleSuccessorInfo:"{0} successori",accessibleDependencyInfo:"Il tipo di dipendenza {0}, collega {1} a {2}",startStartDependencyAriaDesc:"da inizio a inizio",startFinishDependencyAriaDesc:"da inizio a fine",finishStartDependencyAriaDesc:"da fine a inizio",finishFinishDependencyAriaDesc:"da fine a fine",tooltipZoomIn:"Ingrandisci",tooltipZoomOut:"Riduci",labelRow:"Riga",labelStart:"Inizio",labelEnd:"Fine",labelDate:"Data",labelBaselineStart:"Inizio baseline",labelBaselineEnd:"Fine baseline",labelBaselineDate:"Data baseline",labelLabel:"Etichetta",labelProgress:"Stato di avanzamento",labelMoveBy:"Sposta da",taskMoveInitiated:"Spostamento task avviato",taskMoveSelectionInfo:"altre {0} selezionate",taskMoveInitiatedInstruction:"Usare i tasti freccia per lo spostamento",taskMoveFinalized:"Spostamento task finalizzato",taskMoveCancelled:"Spostamento task annullato"},"oj-ojLegend":{componentName:"Legenda "},"oj-ojNBox":{highlightedCount:"{0}/{1}",labelOther:"Altri",labelGroup:"Gruppo",labelSize:"Dimensione",labelAdditionalData:"Dati aggiuntivi",componentName:"NBox"},"oj-ojPictoChart":{componentName:"Grafico a immagini"},"oj-ojSparkChart":{componentName:"Grafico"},"oj-ojSunburst":{labelColor:"Colore",labelSize:"Dimensione",tooltipExpand:"Espandi",tooltipCollapse:"Comprimi",componentName:"Sunburst"},"oj-ojTagCloud":{componentName:"Cloud di tag"},"oj-ojThematicMap":{componentName:"Mappa tematica"},"oj-ojTimeAxis":{componentName:"Asse del tempo"},"oj-ojTimeline":{componentName:"Controllo temporale",accessibleItemDesc:"La descrizione è {0}.",accessibleItemEnd:"L'ora di fine è {0}.",accessibleItemStart:"L'ora di inizio è {0}.",accessibleItemTitle:"Il titolo è {0}.",labelSeries:"Serie",tooltipZoomIn:"Ingrandisci",tooltipZoomOut:"Riduci"},"oj-ojTreemap":{labelColor:"Colore",labelSize:"Dimensione",tooltipIsolate:"Isola",tooltipRestore:"Ripristina",componentName:"Mappa struttura"},"oj-dvtBaseComponent":{labelScalingSuffixThousand:"K",labelScalingSuffixMillion:"M",labelScalingSuffixBillion:"B",labelScalingSuffixTrillion:"T",labelScalingSuffixQuadrillion:"Q",labelInvalidData:"Dati non validi",labelNoData:"Nessun dato da visualizzare",labelClearSelection:"Cancella selezione",labelDataVisualization:"Visualizzazione dati",stateSelected:"Selezionato",stateUnselected:"Non selezionato",stateMaximized:"Ingrandito",stateMinimized:"Ridotto a icona",stateExpanded:"Espanso",stateCollapsed:"Compresso",stateIsolated:"Isolato",stateHidden:"Nascosto",stateVisible:"Visibile",stateDrillable:"Con drilling",labelAndValue:"{0}: {1}",labelCountWithTotal:"{0} di {1}"},"oj-ojNavigationList":{defaultRootLabel:"Lista di navigazione",hierMenuBtnLabel:"Pulsante Menu gerarchico",selectedLabel:"selezionato",previousIcon:"Precedente",msgFetchingData:"Recupero dati in corso...",msgNoData:"Nessun elemento da visualizzare.",overflowItemLabel:"Altro",accessibleReorderTouchInstructionText:"Toccare due volte e tenere premuto. Attendere il segnale sonoro e riordinare.",accessibleReorderBeforeItem:"Prima di {item}",accessibleReorderAfterItem:"Dopo {item}",labelCut:"Taglia",labelPasteBefore:"Incolla prima",labelPasteAfter:"Incolla dopo",labelRemove:"Rimuovi",removeCueText:"Rimovibile"},"oj-ojSlider":{noValue:"ojSlider non ha valore",maxMin:"Il valore massimo non deve essere inferiore o uguale al valore minimo",valueRange:"Il valore deve essere compreso nell'intervallo minimo-massimo",optionNum:"L'opzione {option} non è un numero",invalidStep:"Passo non valido; il passo deve essere > 0"},"oj-ojDialog":{labelCloseIcon:"Chiuso"},"oj-ojPopup":{ariaLiveRegionInitialFocusFirstFocusable:"Accesso al popup. Premere F6 per spostarsi tra il popup e il controllo associato.",ariaLiveRegionInitialFocusNone:"Popup aperto. Premere F6 per spostarsi tra il popup e il controllo associato.",ariaLiveRegionInitialFocusFirstFocusableTouch:"Accesso al popup. Il popup può essere chiuso spostandosi all'ultimo collegamento all'interno del popup.",ariaLiveRegionInitialFocusNoneTouch:"Popup aperto.  Spostarsi al collegamento successivo per stabilire l'elemento attivo all'interno del popup.",ariaFocusSkipLink:"Toccare due volte per spostarsi al popup aperto.",ariaCloseSkipLink:"Toccare due volte per chiudere il popup aperto."},"oj-pullToRefresh":{ariaRefreshLink:"Attiva il collegamento per aggiornare il contenuto",ariaRefreshingLink:"Aggiornamento del contenuto",ariaRefreshCompleteLink:"Aggiornamento completato"},"oj-ojSwipeActions":{ariaShowStartActionsDescription:"Mostra azioni di avvio",ariaShowEndActionsDescription:"Mostra azioni di fine",ariaHideActionsDescription:"Nascondi azioni"},"oj-ojIndexer":{indexerCharacters:"A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z",indexerOthers:"#",ariaDisabledLabel:"Intestazione Nessun gruppo corrispondente",ariaOthersLabel:"numero",ariaInBetweenText:"Tra {first} e {second}",ariaKeyboardInstructionText:"Premere Invio per selezionare un valore.",ariaTouchInstructionText:"Toccare 2 volte e tenere premuto per immettere la modalità movimento,quindi trascinare su o giù per regolare il valore."},"oj-ojMenu":{labelCancel:"Annulla"},"oj-ojColorSpectrum":{labelHue:"Tonalità",labelOpacity:"Opacità",labelSatLum:"Saturazione/Luminanza",labelThumbDesc:"Dispositivo di scorrimento quadridirezionale spettro di colori."},"oj-ojColorPalette":{labelNone:"Nessuno"},"oj-ojColorPicker":{labelSwatches:"Colori campione",labelCustomColors:"Colori personalizzati",labelPrevColor:"Colore precedente",labelDefColor:"Colore predefinito",labelDelete:"Elimina",labelDeleteQ:"Eliminare?",labelAdd:"Aggiungi",labelAddColor:"Aggiungi colore",labelMenuHex:"HEX",labelMenuRgba:"RGBa",labelMenuHsla:"HSLa",labelSliderHue:"Tonalità",labelSliderSaturation:"Saturazione",labelSliderSat:"Sat.",labelSliderLightness:"Brillantezza",labelSliderLum:"Luminosità",labelSliderAlpha:"Alfa",labelOpacity:"Opacità",labelSliderRed:"Rosso",labelSliderGreen:"Verde",labelSliderBlue:"Blu"},"oj-ojFilePicker":{dropzoneText:"Rilasciare i file qui o fare clic per caricare"},"oj-ojProgressbar":{ariaIndeterminateProgressText:"In corso"},"oj-ojMessage":{labelCloseIcon:"Chiuso",categories:{error:"ERROR",warning:"WARNING",info:"INFORMATION",confirmation:"CONFIRMATION"}},"oj-ojMessages":{labelLandmark:"Messaggi",ariaLiveRegion:{navigationFromKeyboard:"Accesso all'area messaggi. Premere F6 per ritornare all'elemento evidenziato in precedenza.",navigationToTouch:"L'area messaggi contiene nuovi messaggi. Utilizzare il rotore voice-over per andare al contrassegno messaggi.",navigationToKeyboard:"L'area messaggi contiene nuovi messaggi. Premere F6 per andare all'area messaggi più recenti.",newMessage:"Categoria messaggio {category}. {summary}."}}});