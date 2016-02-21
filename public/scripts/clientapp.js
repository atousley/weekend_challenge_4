$(document).ready(function(){
    getTasks();
    $('#task_form').on('submit', addTask);
    $('.task_list').on('click', '.complete', completeTask);
    $('.all_lists').on('click', '.delete', deleteTask);
});

function addTask() {
    event.preventDefault();

    var results = {};

    $.each($('#task_form').serializeArray(), function(i, field) {
        results[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/new_task',
        data: results,
        success: function(data) {
            if(data) {
                getNewTask();
            } else {
                console.log('error');
            }
            $('#task_form').find('input[type=text]').val('');
        }
    });
}

function getNewTask() {
    $.ajax({
        type: 'GET',
        url: '/new_task',
        success: function (data) {
            appendTasks(data);
        }
    });
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/get_all',
        success: function (data) {
            $('.all_lists').find('.tasks').remove();
            appendTasks(data);
            getComplete();
        }
    });
}

function appendTasks(data) {

    data.forEach(function(task) {
        $('.task_list').append('<div class="tasks" id="task-' + task.id + '"></div>');

        var $el = $('.task_list').children().last();

        $el.append('<p>Task: ' + task.task + '</p>');
        $el.append('<button class="complete" data-id = " '+ task.id +' ">Complete</button>');
        $el.append('<button class="delete" data-delete = " '+ task.id +' ">Delete</button>');
    });
}

function completeTask() {
    event.preventDefault();

    var completed = {};
    var index = $(this).data('id');

    completed.id = index;

    $.ajax({
        type: 'POST',
        url: '/complete',
        data: completed,
        success: function(data) {
            if(data) {
                getComplete();
            } else {
                console.log('error');
            }
        }
    });
}

function getComplete() {
    $.ajax({
        type: 'GET',
        url: '/complete',
        success: function (data) {
            showComplete(data);
        }
    });
}

function showComplete(data) {
    console.log(data);
    data.forEach(function(task) {
        $('.completed_list').append('<div class="tasks completed"></div>');

        var $el = $('.completed_list').children().last();

        $el.append('<p>Task: ' + task.task + '</p>');
        $el.append('<button class="complete checked">Done!</button>');
        $el.append('<button class="delete" data-delete = " '+ task.id +' ">Delete</button>');

        $('#task-' + task.id).remove();
    });
}

function deleteTask() {
    event.preventDefault();

  var ask = confirm('Are you sure you want to delete this task?');
    if(ask == true) {
        var deleted = {};
        var index = $(this).data('delete');

        deleted.id = index;

        $.ajax({
            type: 'POST',
            url: '/delete',
            data: deleted,
            success: function (data) {
                if (data) {
                    getTasks();
                } else {
                    console.log('error');
                }
            }
        });
    }
}
