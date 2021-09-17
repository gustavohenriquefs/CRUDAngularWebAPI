import { Pessoa } from './../../Pessoa';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss'],
})
export class PessoasComponent implements OnInit {

  formulario: FormGroup;
  tituloFormulario: string;

  constructor(private pessoasService: PessoasService) { }

  ngOnInit(): void {
    this.tituloFormulario = "Nova Pessoa"
    this.construcaoForm();
  }

  construcaoForm() {
    this.formulario =
      new FormGroup({
        nome: new FormControl(null),
        sobrenome: new FormControl(null),
        idade: new FormControl(null),
        profissao: new FormControl(null)
      });
  }

  enviarFormulario(): void {
    console.log(this.formulario.value);
    const pessoa: Pessoa = this.formulario.value;
    console.log(pessoa.idade)
    console.log(pessoa);
    this.pessoasService.salvarPessoa(pessoa)
      .subscribe({
        next: res => {
          console.log(res);
          alert('Pessoa inserida com sucesso!');
        },
        error: error => console.log(error)
      })
  }
}
