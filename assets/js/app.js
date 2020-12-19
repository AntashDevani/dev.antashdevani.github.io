"use strict";
import { ADs } from './lib/ads.js';

const _ = {
	W:window,
	D:document,
	L:localStorage,
	chrome:navigator.userAgent.indexOf("Chrome"),
	S:['addEventListener','load','resize','keyup','click','change'],
	gret:"",
	BGImage:""
}

const external_url = {
	'google':'https://google.com',
	'google_query':function(){
		return this.google+'/search?q='
	},
	'google_logo':'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
	'bettary':'https://img.icons8.com/ios/2x/empty-battery.png',
	'jiosaavn':"https://imantashdevani.github.io/jiosaavn/index.html",
	'images_url':function(number){
		console.log("number===========",number)
		return number
	},
	'images':{
		'FHD':function(){external_url.images_url(3)},
		'MEDIUM':'https://picsum.photos/'+_.W.innerWidth+'/3000',
		'LOW':'https://picsum.photos/'+_.W.innerWidth+'/1000'
	}
}
var JsonNodes = {
	BG: [{
		"name": "div",
		"attr": {
			"class": "bg"
		}
	}],
	Main: [{
		"name": "div",
		"attr": {
			"class": "main"
		}
	}],
	header: [{
		"name": "header",
		"attr": {
			"class": "remove",
			"app-parent-id":"div.main"
		},
		"children": [{
			"name": "div",
			"attr": {
				"width33": "",
				"google": ""
			},
			"children": [{
				"name": "div",
				"attr": {
					"google_logo": ""
				}
			}, {
				"name": "input",
				"attr": {
					"name": "text",
					"class": "search-input",
					"accessKey": "g",
					"special": ""
				}
			}]
		}, {
			"name": "div",
			"attr": {
				"width33": "",
				"time": ""
			},
			"children": [{
				"name": "span",
				"attr": {
					"class": "time"
				},
			}]
		}, {
			"name": "div",
			"attr": {
				"width33": "",
				"control_area": ""
			},
			"children": [{
				"name": "div",
				"attr": {
					"class": "bettary"
				},
				"children": [{
					"name": "span",
					"attr": {
						"class": "bettarypercentage"
					}
				}]
			}, {
				"name": "div",
				"attr": {
					"class": "theme-switch-wrapper"
				},
				"children": [{
					"name": "label",
					"attr": {
						"class": "theme-switch",
						"for": "checkbox"
					},
					"children": [{
						"name": "input",
						"attr": {
							"type": "checkbox",
							"accessKey": "a",
							"id": "checkbox"
						}
					}, {
						"name": "div",
						"attr": {
							"class": "slider round"
						}
					}]
				}]
			}]
		}]
	}],
	main: [{
		"name": "main",
		"attr": {
			"app-parent-id":"div.main"
		}
	}],
	briefs: [{
		"name": "div",
		"attr": {
			"app-parent-id":"main"
		},
		"children": [{
			"name": "h1",
			"attr": {
				"class": "gretting"
			}
		}, {
			"name": "h1",
			"attr": {
				"class": "brief"
			}
		}]
	}]
}
class App {
	constructor(key){
		if (key==atob('QURz') && _.W.hasOwnProperty(atob('QURz'))){
			if (this.check_availability()){
				this.run_app()
			}
		}
		else{
			console.error("May be you change Something")
		}
	}
	check_availability(){
		if (_.chrome==-1){
			document.write('<h1 style="line-height:2;color:red;">Use Chrome Browser for Better Experince</h1>');
			return false;
		}else{return true}
	}
	async run_app(){
		await this.main();
	}

	set_storage(){
		let storage_default = {
			Xy51:"", // UserName
			Xy5j:"U29sdXRpb25Gb3VuZGVy", // Company
			Xy5D:"SW5kaWE=", // Country
			Xy5kbQ:"false", // Dark Mode,
			aV9x:"MEDIUM", // IMAGE QUALITY
			first:1
		}
		if (!_.L.getItem('first')){
			_.L.clear()
			for (let i in storage_default){
				_.L.setItem(i,storage_default[i])
			}
		}
	}

	addZero(a){if(a<10){a="0"+a}return a}

	getBettary(){
		navigator.getBattery().then((b)=>{
			let c = b.level;
			let p = this.addZero(parseInt(c*100));
			let d = ((b.charging) ? p+'^' : p)
			ADs('.bettarypercentage').text(d);
		})
	}

	enable_dark_mode(){
		let l = localStorage.getItem("Xy5kbQ");
		let b = ADs("body");
		if (l=="true"){
			ADs("#checkbox").checked=true;
			b[0].classList.add("dark")
		}
		else if (l=="false") {
			ADs("#checkbox").checked=false;
			b[0].classList.remove("dark")
		}
	}

	_gretting(direct=false){
		let h = new Date().getHours();
		let d;
		if (h>=5&&h<12){d="Good Morning"}else if(h>=12&&h<17){d="Good Afternoon"}else if(h>=17&&h<22){d="Good Evening"}else{d="Good Night"}
		if (!_.gret||_.gret!=d||direct){
			_.gret=d;
			let x=localStorage.getItem("Xy51");
			ADs('.gretting').text((x) ? _.gret+', '+atob(x) : _.gret)
		}
	}

	_c_c_(a,b){
		ADs('.brief').text(atob(a) + ' - '+ atob(b));
	}

	add_main_page(){
		ADs("main").css({height:'calc('+_.W.innerHeight+'px - 160px)'})
		this._gretting(true)
		this._c_c_(_.L.getItem('Xy5j'),_.L.getItem('Xy5D'))
	}

	async bg_image(){
		fetch(external_url['images'][_.L.getItem('aV9x')]())
		.then(async (r)=>{
			if (r['status']==200){
				url = URL.createObjectURL(await r.blob())
				_.BGImage=url;
				ADs(".bg").css({"background-image": "url(" + _.BGImage + ")"})
			}
			else {
				var d = await fetch('assets/bgs/'+ Math.floor(Math.random() * Math.floor(24)) + ".jpg");
				url = URL.createObjectURL(await d.blob());
				_.BGImage=url;
				ADs(".bg").css({"background-image": "url(" + _.BGImage + ")"})
			}
		})
		.catch(async (x)=>{
			var d = await fetch('assets/bgs/'+ Math.floor(Math.random() * Math.floor(24)) + ".jpg");
			url = URL.createObjectURL(await d.blob());
			_.BGImage=url;
			ADs(".bg").css({"background-image": "url(" + _.BGImage + ")"})
		})
	}

	async main(){
		_.D.title="ADs - New Tab";
		for (let i in JsonNodes){
			let x =await ADs.j2h(JsonNodes[i]);
			ADs(x.getAttribute("app-parent-id") ? x.getAttribute("app-parent-id") : _.D.body).append(x)
		}
		this.set_storage()
		this.enable_dark_mode()
		this.getBettary()
		ADs("input.search-input")[0].focus();
		this.add_main_page()
		this.bg_image()
		console.log("funny----")
	}
}
new App(ADs.fn.name)
