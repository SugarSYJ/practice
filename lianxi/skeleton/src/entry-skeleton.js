import Vue from 'vue'
import Skeleton from './skeleton'
export default new Vue({
	components: {
		Skeleton
	},
	template: `
    <div>
      <skeleton id="skeleton" style="display:none"/>
    </div>`
})