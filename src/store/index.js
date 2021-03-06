import Vue from 'vue'
import Vuex from'vuex'
import State from './state.js'
import Mutations from './mutations.js'
import Getters from './getters.js'
import Actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
	state:State,
	getters:Getters,
	mutations:Mutations,
	actions:Actions
})



