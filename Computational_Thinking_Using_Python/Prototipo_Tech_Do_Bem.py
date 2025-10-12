paciente_nome = ""
paciente_telefone = ""
dentista_nome = ""
dentista_cro = ""
dentista_usuario = ""
dentista_senha = ""
colaborador_nome = ""
colaborador_cargo = ""
colaborador_usuario = ""
colaborador_senha = ""
atendimento_paciente = ""
atendimento_tipo = ""
atendimento_observacao = ""

print("\nSeja bem-vindo(a) ao sistema de atendimento da Turma do Bem.")

while True:
    print("\n--------------------------------")
    print("MENU PRINCIPAL")
    print("1 - Sou paciente e preciso de ajuda")
    print("2 - Quero me afiliar (Dentista ou Colaborador)")
    print("3 - Quero fazer uma doação")
    print("4 - Acessar o sistema (Login)")
    print("\n0 - Encerrar o programa.")

    opcao = int(input("Digite a opção escolhida: "))

    if opcao == 1:
        print("\nVocê escolheu: Sou paciente e preciso de ajuda.")
        print("Para iniciar, precisamos de alguns dados.")
        paciente_nome = input("Por favor, digite seu nome completo: ")
        paciente_telefone = input("Agora, digite seu telefone para contato: ")
        print(f"\nObrigado, {paciente_nome}! Seu pedido de ajuda foi registrado. Um de nossos colaboradores entrará em contato em breve.")

    elif opcao == 2:
        print("\nVocê escolheu: Quero me afiliar.")
        print("1 - Sou Dentista e quero ser voluntário")
        print("2 - Quero ser um Colaborador da ONG")
        tipo_afiliado = int(input("Digite a opção: "))

        if tipo_afiliado == 1:
            print("\n--- Cadastro de Dentista Voluntário ---")
            dentista_nome = input("Nome completo: ")
            dentista_cro = input("Número do seu CRO: ")
            dentista_usuario = input("Crie um e-mail para login: ")
            dentista_senha = input("Crie uma senha: ")
            print(f"\nDr(a). {dentista_nome}, seu cadastro foi realizado com sucesso!")

        elif tipo_afiliado == 2:
            print("\n--- Cadastro de Colaborador ---")
            colaborador_nome = input("Nome completo: ")
            colaborador_cargo = input("Qual será o seu cargo (Ex: Atendente, Coordenador)? ")
            colaborador_usuario = input("Crie um e-mail para login: ")
            colaborador_senha = input("Crie uma senha: ")
            print(f"\n{colaborador_nome}, seu cadastro de colaborador foi realizado com sucesso!")

        else:
            print("Opção de afiliação inválida!")

    elif opcao == 3:
        print("\nVocê escolheu: Quero fazer uma doação.")
        valor = float(input("Digite o valor da doação: R$ "))
        print(f"Muito obrigado! Sua doação de R${valor:.2f} foi registrada.")

    # A opção 4 habilita a possibilidade de entrar em outro loop.
    # Se o usuário já tiver sido cadastrado, então aqui será possível logar com os dados informados anteriormente.
    # Caso contrário, será possível voltar ao menu principal por meio da opção 0, que está no escopo
    # deste loop e não interfere com a opção 0 do loop maior (o do menu principal).
    elif opcao == 4:
        print("\n--- Tela de Login ---")
        login_usuario = input("Usuário (e-mail): ")
        login_senha = input("Senha: ")

        if login_usuario == dentista_usuario and login_senha == dentista_senha:
            print(f"\nLogin bem-sucedido! Bem-vindo(a), Dr(a). {dentista_nome}.")

            while True:
                print("\n-- PAINEL DO DENTISTA --")
                print("1 - Consultar dados do paciente cadastrado")
                print("2 - Registrar novo atendimento")
                print("0 - Sair (Logout)")
                opcao_dentista = int(input("Digite sua opção: "))

                if opcao_dentista == 1:
                    if paciente_nome == "":
                        print("\nNenhum paciente cadastrado no sistema ainda.")
                    else:
                        print("\n-- Dados do Paciente --")
                        print(f"Nome: {paciente_nome}")
                        print(f"Telefone: {paciente_telefone}")

                elif opcao_dentista == 2:
                    if paciente_nome == "":
                        print("\nNenhum paciente cadastrado para registrar um atendimento.")
                    else:
                        print(f"\n-- Novo Atendimento para {paciente_nome} --")
                        atendimento_tipo = input("Tipo de atendimento (Ex: Avaliação, Restauração): ")
                        atendimento_observacao = input("Observações: ")
                        atendimento_paciente = paciente_nome
                        print("Atendimento registrado com sucesso!")

                elif opcao_dentista == 0:
                    print("Fazendo logout...")
                    break
                else:
                    print("Opção inválida!")

        elif login_usuario == colaborador_usuario and login_senha == colaborador_senha:
            print(f"\nLogin bem-sucedido! Bem-vindo(a), {colaborador_nome}.")

            while True:
                print("\n-- PAINEL DO COLABORADOR --")
                print("1 - Consultar dados do paciente cadastrado")
                print("2 - Ver último atendimento registrado")
                print("0 - Sair (Logout)")
                opcao_colab = int(input("Digite sua opção: "))

                if opcao_colab == 1:
                    if paciente_nome == "":
                        print("\nNenhum paciente cadastrado no sistema ainda.")
                    else:
                        print("\n-- Dados do Paciente --")
                        print(f"Nome: {paciente_nome}")
                        print(f"Telefone: {paciente_telefone}")

                elif opcao_colab == 2:
                    if atendimento_paciente == "":
                        print("\nNenhum atendimento foi registrado ainda.")
                    else:
                        print("\n-- Último Atendimento Registrado --")
                        print(f"Paciente: {atendimento_paciente}")
                        print(f"Tipo: {atendimento_tipo}")
                        print(f"Observações: {atendimento_observacao}")

                elif opcao_colab == 0:
                    print("Fazendo logout...")
                    break
                else:
                    print("Opção inválida!")
        else:
            print("\nUsuário ou senha incorretos!")

    elif opcao == 0:
        print("\nEncerrando o programa....")
        break

    else:
        print("\nOpção inválida! Por favor, tente novamente.")
