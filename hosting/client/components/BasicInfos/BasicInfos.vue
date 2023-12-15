<template>
    <el-form>
        <el-form-item label="Nom de la Légende" style="font-weight: bold">
            <el-input v-model="name" placeholder="Nom de la Légende" />
        </el-form-item>
        <el-form-item label="Type de légende" style="font-weight: bold">
            <el-radio-group v-model="type">
                <el-radio label="single">Unique</el-radio>
                <el-radio label="series">Plusieurs Chapitres</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-tabs v-model="activeName">
            <el-tab-pane label="Cartes" name="cartes">  
                <el-row style="width: 100%">
                    <el-col :span="12">
                        <h5 style="margin-top: 0; color: #606266; font-size: 14px">Cartes de la Légende</h5>
                    </el-col>
                    <el-col :span="12" style="text-align: right;">
                        <el-button
                        type="info"
                        size="mini"
                        icon="el-icon-circle-plus"
                        @click="handleNewCard"
                        >
                        Nouvelle carte
                        </el-button>
                    </el-col>
                </el-row>
                <CardsOverview />
            </el-tab-pane>
            <el-tab-pane label="Détails" name="details">
                <el-form-item label="Auteur" style="font-weight: bold">
                    <el-input v-model="author" placeholder="Auteur" />
                </el-form-item>
                <el-form-item label="Résumé">
                    <el-input v-model="abstract" type="textarea" required rows="3" />
                </el-form-item>
                <el-form-item label="Année">
                    <el-input v-model="year" placeholder="Année" />
                </el-form-item>
                <el-form-item label="Nb joueurs">
                    <el-input v-model="players" placeholder="Nombre de Joueurs" />
                </el-form-item>
                <el-form-item label="Difficulté">
                    <br/> 
                    <el-checkbox-group v-model="difficulty">
                        <el-checkbox-button  v-for="difficultyOpt in difficultiesOpt" :label="difficultyOpt.key" :key="difficultyOpt.key">{{difficultyOpt.name}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Legendes Bonus Officielle">
                    <el-checkbox v-model="officialBonus">Oui</el-checkbox>
                </el-form-item>
                <el-form-item label="Plateau">
                    <br/> 
                    <el-checkbox-group v-model="board" size="mini">
                        <el-checkbox-button  v-for="boardOpt in boardOpts" :label="boardOpt.key" :key="boardOpt.key">{{boardOpt.name}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Nécessite">
                    <br/> 
                    <el-checkbox-group v-model="boxExt" size="mini" >
                        <el-checkbox-button  v-for="boxExtOpt in boxExtOpts" :label="boxExtOpt.key" :key="boxExtOpt.key">{{boxExtOpt.name}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="Download" name="Download">
                <el-form-item label="In-App Additionnal Pdf" style="font-weight: bold">
                    <el-input v-model="additionaldownload" placeholder="In-App Additionnal Pdf" />
                </el-form-item>
                <el-form-item label="Legend Download URL" style="font-weight: bold">
                    <el-input v-model="download" placeholder="Download URL" />
                </el-form-item>
            </el-tab-pane>
        </el-tabs>     
        
    <el-form-item v-if="(type === 'series')" label="Nom de la Saga">
          <el-input
            v-model="series"
            placeholder="Nom de la Saga"
            />
    </el-form-item>
    <el-form-item v-if="(type === 'series')" label="Numéro de Légende">
          <el-input
            v-model="number"
            placeholder="Numéro de la légende dans la série"
            :maxlength="1"
            />
    </el-form-item>
  </el-form>
</template>
<script>
import CardsOverview from "./../CardsOverview/CardsOverview";

const difficultiesOptions = [{name:'Facile', key:1}, {name:'Moyenne', key:2}, {name:'Difficile', key:3}];
const boardOptions = [{name:'Andor',key:1},{name:'Cavern',key:2},{name:'Mer du Nord',key:3},{name:'Hadria',key:4},{name:'Montagnes grises',key:5},{name:'Krahd',key:6},{name:'Andor enneigé',key:7},{name:'Pays des trois frères',key:8}];
const boxExtOptions = [{name:'Andor (base)', key:1},{name:'Voyage vers le Nord', key:2},{name:'Le Dernier Espoir', key:3}, {name:'Froid Eternel', key:4}, {name:'Boite Bonus', key:5}, {name:'Lég. oubliées : Heures sombres', key:6}, {name:'Lég. oubliées : Esprits Ancestraux', key:7}, {name:'Lég. de Gardétoile', key:8}, {name:'Nouveaux Héros', key:9}, {name:'Héros Sombres', key:10}  ]

export default {    
    components: { CardsOverview},
    data() {
      return {
        activeName: 'cartes',
        difficultiesOpt: difficultiesOptions,
        boardOpts: boardOptions,
        boxExtOpts: boxExtOptions,
      };
    },
    computed: {
        name: {
            get() {
                return this.$store.state.name;
            },
            set(value) {
                this.$store.commit("setName", value);
            }
        },
        author: {
            get() {
                return this.$store.state.author;
            },
            set(value) {
                this.$store.commit("setAuthor", value);
            }
        },
        abstract: {
            get() {
                return this.$store.state.abstract;
            },
            set(value) {
                this.$store.commit("setAbstract", value);
            }
        },
        year: {
            get() {
                return this.$store.state.year;
            },
            set(value) {
                this.$store.commit("setYear", value);
            }
        },
        players: {
            get() {
                return this.$store.state.players;
            },
            set(value) {
                this.$store.commit("setPlayers", value);
            }
        },
        difficulty: {
            get() {
                return this.$store.state.difficulty;
            },
            set(value) {
                this.$store.commit("setDifficulty", value);
            }
        },
        board: {
            get() {
                return this.$store.state.board;
            },
            set(value) {
                this.$store.commit("setBoard", value);
            }
        },
        boxExt: {
            get() {
                return this.$store.state.boxExt;
            },
            set(value) {
                this.$store.commit("setBoxExt", value);
            }
        },
        additionaldownload: {
            get() {
                return this.$store.state.additionaldownload;
            },
            set(value) {
                this.$store.commit("setAdditionalDownload", value);
            }
        },
        download: {
            get() {
                return this.$store.state.download;
            },
            set(value) {
                this.$store.commit("setDownload", value);
            }
        },
        type: {
            get() {
                return this.$store.state.type;
            },
            set(value) {
                if (value == 'single') {
                this.$store.commit("setSeries", '');
                this.$store.commit("setNumber", '');
                }
                this.$store.commit("setType", value);
            }
        },
        series: {
            get() {
                return this.$store.state.series;
            },
            set(value) {
                this.$store.commit("setSeries", value);
            }
        },
        number: {
            get() {
                return this.$store.state.number;
            },
            set(value) {
                this.$store.commit("setNumber", value);
            }
        }
    },
    methods: {
        handleNewCard() {
            this.$store.commit("addCard");
        }
    }
};
</script>

<style scoped>
</style>
