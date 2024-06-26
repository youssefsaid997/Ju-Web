import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from 'src/app/ApiServices/problem.service';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.css']
})
export class ProblemDetailsComponent implements OnInit {

  source: any;
  problemCode: any;
  problemInfo: any = null;
  samples: any = [];
  isLoading: boolean = false;
  apiError: string = '';
  title: string = '';

  submitProblemForm: FormGroup = new FormGroup({
    language: new FormControl(null, [Validators.required]),
    solution: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _ProblemService: ProblemService,
    private _ActivatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document) { }

  fetchEndPointToGetSpecificProblem() {
    this._ProblemService.getSpecificProblem(this.source, this.problemCode).subscribe({
    
     next: (response) => {
        console.log(response);
        if (response.success === true) {
          this.problemInfo = response.data
          this.titleService.setTitle(this.problemInfo.title);
          this.samples = response.data.samples       
    }      
      },
      error: (err) => {
        console.log(err);
      }
    });

     
}

  ngOnInit(): void {
    // this.loadMathJaxConfig(); this.loadMathJax();
    this.loadMathJaxConfig();
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.source = param.get('source');
      this.problemCode = param.get('problemCode');
      this.loadMathJax();
    });
   
   
    this.fetchEndPointToGetSpecificProblem(); 
      
    
  }

  loadMathJaxConfig() {
    let script = this.renderer.createElement('script');
    script.type = 'text/x-mathjax-config';
    script.text = `
      MathJax.Hub.Config({
        tex2jax: {inlineMath: [['$$$','$$$']], displayMath: [['$$$$$$','$$$$$$']]}
      });
    `;
    this.renderer.appendChild(this.document.head, script);
  }

  loadMathJax() {
    let script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = 'https://mathjax.codeforces.org/MathJax.js?config=TeX-AMS_HTML-full';
    this.renderer.appendChild(this.document.head, script);
  }

}
