from fabric.api import *

def prepare_dev_environment():
        local('sudo ansible-galaxy install -r ansible/requirements.yml')

def deploy():
  local('ansible-playbook --tags deploy ansible/site.yml')


