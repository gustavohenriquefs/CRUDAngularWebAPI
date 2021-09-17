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
  pessoas: Pessoa[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private pessoasService: PessoasService) { }

  ngOnInit(): void {
    this.pegarPessoas();
  }

  exibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.construirFormulario();
  }

  exibirFormularioAtualizacao(pessoaId): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.pessoasService.pegarPeloId(pessoaId).subscribe(
      res => {
        this.tituloFormulario = `Atualizar ${res.nome} ${res.sobrenome}`;

        this.formulario = new FormGroup({
          pessoaId: new FormControl(res.pessoaId),
          nome: new FormControl(res.nome),
          sobrenome: new FormControl(res.sobrenome),
          idade: new FormControl(res.idade),
          profissao: new FormControl(res.profissao)
        })
      }
    )
  }

  construirFormulario() {
    this.tituloFormulario = "Nova Pessoa"
    this.formulario =
      new FormGroup({
        nome: new FormControl(null),
        sobrenome: new FormControl(null),
        idade: new FormControl(null),
        profissao: new FormControl(null)
      });
  }

  pegarPessoas() {
    this.pessoasService.pegarTodas().subscribe(
      res => this.pessoas = res
    )
  }

  enviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId > 0) {
      this.pessoasService.atualizarPessoa(pessoa).subscribe(res => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Pessoa atualizada com sucesso!');
        this.pegarPessoas();
      });
    } else {
      this.pessoasService.salvarPessoa(pessoa)
        .subscribe({
          next: res => {
            this.visibilidadeFormulario = false;
            this.visibilidadeTabela = true;
            alert('Pessoa inserida com sucesso!');
            this.pegarPessoas();
          },
          error: error => console.log(error)
        })
    }
  }

  voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }
}
