from opencog.atomspace import AtomSpace
from opencog.utilities import initialize_opencog, finalize_opencog
from opencog.type_constructors import *
from opencog.bindlink import execute_atom
import logging as log
import __main__

def define_knowledge_base():
    log.info('creating new knowledge base')
    EvaluationLink(
            PredicateNode('partof'),
            ListLink(
                ConceptNode('electric motor'),
                ConceptNode('refrigerator')
                ),
            TruthValue(1.0, 1.0)
            )

def query_parts_for_donation(device):
    query = BindLink(
            VariableNode("X"),
            EvaluationLink(
                PredicateNode('partof'),
                ListLink(
                    VariableNode('X'),
                    device
                    )
                ),
            VariableNode('X')
            )
    global space
    return execute_atom(space, query)
    
def run():

    define_knowledge_base()
    parts = query_parts_for_donation(ConceptNode('refrigerator'))
    print('You could donate the following parts: %s' % parts)


if __name__ == '__main__':
    space = AtomSpace()
    initialize_opencog(space)
    run()
